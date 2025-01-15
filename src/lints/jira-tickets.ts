import { LintError, Context, LintErrorType, RuleConfig } from '../types'

export async function test(
  context: Context,
  level: LintErrorType,
  config: RuleConfig,
): Promise<LintError> {
  const { body } = context.pull_request
  const prefixes = config?.prefix ? [...config.prefix, 'DOOM'] : ['DOOM']
  const rgxp = new RegExp(`(${prefixes.join('|')})-\\d+`, 'gi')

  // check that a ticket is mentioned
  // if mentioned all good
  // if not, return an error

  return !rgxp.test(body)
    ? {
        type: level,
        message:
          '[No JIRA ticket found in PR body](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#jira-ticket)',
      }
    : { type: 'none', message: '' }
}
