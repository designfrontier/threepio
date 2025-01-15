import { LintError, Context, LintErrorType } from '../types'

export async function test(
  context: Context,
  level: LintErrorType,
): Promise<LintError> {
  const { body } = context.pull_request

  // check that a ticket is mentioned
  // if mentioned all good
  // if not, return an error

  return !/(solflow|plat|doom|hxapi)-\d+/gi.test(body)
    ? {
        type: level,
        message:
          '[No JIRA ticket found in PR body](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#jira-ticket)',
      }
    : { type: 'none', message: '' }
}
