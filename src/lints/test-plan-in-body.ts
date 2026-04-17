import { LintError, LintErrorType, Context } from '../types'

export async function test(
  context: Context,
  level: LintErrorType,
): Promise<LintError> {
  const { body } = context.pull_request

  const noTestPlan: LintError = {
    type: level,
    message:
      '[No Test Plan found in PR body](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#test-plan-in-body)',
  }

  const headerMatch = /test plan[^\n]*\n/gi.exec(body)
  if (!headerMatch) return noTestPlan

  const afterHeader = body.slice(headerMatch.index + headerMatch[0].length)

  const hasMeaningfulContent = afterHeader.split('\n').some((line) => {
    const t = line.trim()
    return (
      t.length > 0 &&
      !/^[-*]\s*\[\s*\]\s*list of testing instructions\s*$/i.test(t) &&
      !/^[-*]\s*$/.test(t) &&
      !/^todo\b/i.test(t)
    )
  })

  return hasMeaningfulContent ? { type: 'none', message: '' } : noTestPlan
}
