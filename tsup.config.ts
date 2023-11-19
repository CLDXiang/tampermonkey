import { existsSync, readFileSync, readdirSync, statSync, write, writeFileSync } from 'node:fs'
import { defineConfig } from 'tsup'
import { load } from 'js-toml'
import chalk from 'chalk'

function log(...args: any[]) {
  console.log(chalk.hex('#f4b8e4')('BUILD'), ...args)
}

function convertConfig(configPath: string): [string, string][] {
  return Object.entries(load(readFileSync(configPath, 'utf-8')))
    .flatMap<[string, string]>(([k, v]) => {
      if (Array.isArray(v))
        return v.map<[string, string]>(i => [k, i])
      if (typeof v === 'object') {
        return Object.entries<string>(v)
          .map<[string, string]>(([subK, v]) => subK === 'default' ? [k, v] : [`${k}:${subK}`, v])
      }
      return [[k, v]]
    })
}

const HIGH_PRIORITY_CONFIG_KEYS = ['name', 'namespace', 'version', 'description', 'description:en', 'author']

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
    const scriptNameAndDescriptionList: string[] = []
    const scriptNameAndDescriptionListEn: string[] = []

    const baseConfig = convertConfig('src/config.base.toml')
    scripts.forEach(async (script) => {
      const scriptConfig = convertConfig(`src/${script}/config.toml`)
      const scriptName = scriptConfig.find(([k]) => k === 'name')?.[1]
      const scriptDescription = scriptConfig.find(([k]) => k === 'description')?.[1]
      const scriptDescriptionEn = scriptConfig.find(([k]) => k === 'description:en')?.[1]
      if (scriptName && scriptDescription) {
        scriptNameAndDescriptionList.push(`[${scriptName}](dist/${script}.js) - ${scriptDescription}`)
        if (scriptDescriptionEn)
          scriptNameAndDescriptionListEn.push(`[${scriptName}](dist/${script}.js) - ${scriptDescriptionEn}`)
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
      scriptNameAndDescriptionListEn.map(i => `- ${i}`).join('\n'),
    ).replace(
      '<!--SCRIPT_LIST-->',
      scriptNameAndDescriptionList.map(i => `- ${i}`).join('\n'),
    ))
  },
})
