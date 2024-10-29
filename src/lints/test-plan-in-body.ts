import { LintError, LintErrorType, Context } from '../types'

export async function test(
  context: Context,
  level: LintErrorType
): Promise<LintError> {
  const { body } = context.pull_request

  // check that we have a test plan

  return !/test plan[:\s]*[\n][\n]?([ ]?[-*\d])/gi.test(body)
    ? {
        type: level,
        message:
          '[No Test Plan found in PR body](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#test-plan-in-body)',
      }
    : { type: 'none', message: '' }
}
