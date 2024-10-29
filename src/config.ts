import { Config } from './types'
import { readFileSync, existsSync } from 'fs'
import { parse as parseYaml } from 'yaml'

export function config(): Config {
  const file = `${process.cwd()}/.threepio`
  const conf = existsSync(file) ? parseYaml(readFileSync(file, 'utf-8')) : {}
  const base = {
    tests: {
      jiraTickets: 'error',
      testPlanCheck: 'error',
      allFilesTested: 'warn',
      checkMigrations: 'warn',
      changeSizeCheck: 'warn',
    },
    jira: { projects: ['DOOM', 'PLAT'] },
  }

  return { ...base, ...conf }
}
