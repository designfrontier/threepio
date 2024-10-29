import { config } from './config'
import {
  generateConfigFile,
  cacheConfigFile,
  restoreConfigFile,
} from './test-helpers'

const exampleTests = {
  jiraTickets: 'error',
  testPlanCheck: 'error',
  allFilesTested: 'warn',
  checkMigrations: 'warn',
  changeSizeCheck: 'warn',
}

describe('#config', () => {
  test('should return a base config when none found', () => {
    cacheConfigFile()

    expect(config()).toStrictEqual({
      tests: exampleTests,
      jira: { projects: ['DOOM', 'PLAT'] },
    })

    restoreConfigFile()
  })

  test('should override base with .threepio file contents', () => {
    generateConfigFile(`tests:
  jiraTickets: warn

jira:
  projects:
    - FLIGHT`)

    expect(config()).toStrictEqual({
      tests: { jiraTickets: 'warn' },
      jira: { projects: ['FLIGHT'] },
    })

    restoreConfigFile()
  })

  test('should override partial base with .threepio file contents', () => {
    generateConfigFile(`jira:
  projects:
    - FLIGHT`)

    expect(config()).toStrictEqual({
      tests: exampleTests,
      jira: { projects: ['FLIGHT'] },
    })

    restoreConfigFile()
  })
})
