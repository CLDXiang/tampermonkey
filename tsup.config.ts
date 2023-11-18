import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { defineConfig } from 'tsup'
import { load } from 'js-toml'
import chalk from 'chalk'

function log(...args: any[]) {
  console.log(chalk.hex('#f4b8e4')('BUILD'), ...args)
}

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
    scripts.forEach(async (script) => {
      const config = load(readFileSync(`src/${script}/config.toml`, 'utf-8'))
      writeFileSync(
        `dist/${script}.js`,
        `// ==UserScript==\n${Object.entries(config)
          .map(([k, v]) => `// @${k} ${v}`)
          .join('\n')}\n// ==/UserScript==\n\n${readFileSync(
          `dist/${script}.js`,
          'utf-8',
        )}`,
      )
    })
  },
})
