import { existsSync, readFileSync, readdirSync, statSync, write, writeFileSync } from 'node:fs'
import { defineConfig } from 'tsup'
import { load } from 'js-toml'
import chalk from 'chalk'

function log(...args: any[]) {
  console.log(chalk.hex('#f4b8e4')('BUILD'), ...args)
}

function convertConfig(configPath: string): { list: [string, string][], map: Map<string, string> } {
  const raw = load(readFileSync(configPath, 'utf-8'))
  const list: [string, string][] = []
  const map = new Map<string, string>()

  Object.entries(raw).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      v.forEach((i) => {
        list.push([k, i])
        map.set(k, i)
      })
    }
    else if (typeof v === 'object') {
      Object.entries<string>(v).forEach(([subK, v]) => {
        if (subK === 'default') {
          list.push([k, v])
          map.set(k, v)
        }
        else {
          list.push([`${k}:${subK}`, v])
          map.set(`${k}:${subK}`, v)
        }
      })
    }
    else {
      list.push([k, v])
      map.set(k, v)
    }
  })

  return { list, map }
}

const HIGH_PRIORITY_CONFIG_KEYS = ['name', 'name:zh-CN', 'namespace', 'version', 'description', 'description:zh-CN', 'author']

const scripts = readdirSync('src').filter((file) => {
  const stat = statSync(`src/${file}`)
  return stat.isDirectory() && existsSync(`src/${file}/config.toml`)
})
log(`scripts to build:`)
scripts.forEach(script => log(`- ${script}`))

export default defineConfig({
  entry: Object.fromEntries(
    scripts.map(script => [script, `src/${script}/main.ts`]),
  ),
  format: ['iife'],
  clean: true,
  outExtension: () => ({ js: '.js' }),
  async onSuccess() {
    const readmeMeta = readFileSync('src/README_META.md', 'utf-8')
    const scriptNameAndDescriptionList: Record<string, string[]> = {
      EN: [],
      CN: [],
    }

    const { list: baseConfig } = convertConfig('src/config.base.toml')
    scripts.forEach(async (script) => {
      const { list: scriptConfig, map } = convertConfig(`src/${script}/config.toml`)
      const scriptName = map.get('name')
      const scriptNameCn = map.get('name:zh-CN')
      const scriptDescription = map.get('description')
      const scriptDescriptionCn = map.get('description:zh-CN')

      if (scriptName && scriptDescription) {
        // 如果有中文名和描述，原本的 name 和 description 就是英文的，将中文的单独加到中文列表，英文用英文的
        if (scriptNameCn && scriptDescriptionCn) {
          // 说明是通用的
          scriptNameAndDescriptionList.EN.push(`[${scriptName}](dist/${script}.js) - ${scriptDescription}`)
          scriptNameAndDescriptionList.CN.push(`[${scriptNameCn}](dist/${script}.js) - ${scriptDescriptionCn}`)
        }
        else {
          // zh-CN only
          scriptNameAndDescriptionList.CN.push(`[${scriptName}](dist/${script}.js) - ${scriptDescription}`)
        }
      }
      else { console.warn(`[${script}] missing name or description`) }

      const allConfig = baseConfig.concat(scriptConfig)
      const config = HIGH_PRIORITY_CONFIG_KEYS
        .map(key => allConfig.find(([k]) => k === key))
        .concat(allConfig.filter(([k]) => !HIGH_PRIORITY_CONFIG_KEYS.includes(k)))
        .filter(i => i !== undefined) as [string, string][]

      writeFileSync(
          `dist/${script}.js`,
          `// ==UserScript==\n${config
            .map(([k, v]) => `// @${k} ${v}`)
            .join('\n')}\n// ==/UserScript==\n\n${readFileSync(
            `dist/${script}.js`,
            'utf-8',
          )}`,
      )
    })

    // update README.md
    writeFileSync('README.md', readmeMeta.replace(
      '<!--SCRIPT_LIST_EN-->',
      scriptNameAndDescriptionList.EN.map(i => `- ${i}`).join('\n'),
    ).replace(
      '<!--SCRIPT_LIST_CN-->',
      scriptNameAndDescriptionList.CN.map(i => `- ${i}`).join('\n'),
    ))
  },
})
