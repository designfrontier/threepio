import { LintError, LintErrorType, Context, Config, RuleConfig } from '../types'
import { test as jiraTickets } from './jira-tickets'
import { test as allFilesTested } from './all-files-tested'
import { test as testPlanCheck } from './test-plan-in-body'
import { test as checkMigrations } from './check-migrations'
import { test as changeSizeCheck } from './change-size'

const lints: {
  [key: string]: (
    context: Context,
    level: LintErrorType,
    config: RuleConfig,
  ) => Promise<LintError>
} = {
  jiraTickets,
  allFilesTested,
  testPlanCheck,
  changeSizeCheck,
  checkMigrations,
}
const levels = {
  err: 'error',
  error: 'error',
  warn: 'warning',
  warning: 'warning',
  none: 'none',
}

type lintStackItem =
  | {
      test: (
        context: Context,
        level: LintErrorType,
        config: { [key: string]: any },
      ) => Promise<LintError>
      level: LintErrorType
      config: { [key: string]: RuleConfig }
    }
  | undefined
type Lint = keyof typeof lints
type Levels = keyof typeof levels

export default async function (
  context: Context,
  conf: Config,
): Promise<{
  warning: Array<LintError>
  error: Array<LintError>
  none: Array<LintError>
}> {
  const lintStack: lintStackItem[] = Object.entries(conf.tests)
    .map(([key, value]: [Lint, Levels]) => {
      if (['warn', 'error', 'warning', 'err'].includes(value) && lints[key]) {
        return {
          test: lints[key],
          level: levels[value] as LintErrorType,
          config: (conf?.rules && conf.rules[key]) || {},
        }
      }
    })
    .filter((i) => typeof i !== 'undefined')

  // NOTES: need to load in custom lints to this list of lints
  //  also figure out tht typing here.
  const linted: LintError[] = await Promise.all(
    lintStack.map((test) => {
      return (
        test?.test(context, test.level, test.config) ?? {
          type: 'none',
          message: '',
        }
      )
    }),
  )

  const lintResult = linted.reduce(
    (
      a: {
        warning: Array<LintError>
        error: Array<LintError>
        none: Array<LintError>
      },
      l,
    ) => {
      a[l.type].push(l)
      return a
    },
    { warning: [], error: [], none: [] },
  )

  return lintResult
}
