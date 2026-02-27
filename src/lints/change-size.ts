import { LintError, LintErrorType, Context, File, RuleConfig } from '../types'
const globToRegExp = require('glob-to-regexp')

const LINE_CUTOFF = 500
const FILE_CUTOFF = 10

export async function test(
  context: Context,
  level: LintErrorType,
  config: RuleConfig
): Promise<LintError> {
  const { files, pull_request: pullRequest } = context
  const { additions, deletions, changed_files: changedFiles } = pullRequest

  const packageChanges = files.reduce(
    (a, f: File) => {
      if (f.filename.includes('package-lock.json')) {
        a.additions += f.additions
        a.deletions += f.deletions
      }

      return a
    },
    { additions: 0, deletions: 0 },
  )

  const ignoredChanges = files.reduce(
    (a, f: File) => {
      [...(config?.ignoredGlobs ?? [])].some(ignoredGlob => {
        if (f.filename.match(globToRegExp(ignoredGlob))) {
          a.additions += f.additions
          a.deletions += f.deletions
          return true
        }
      })
      return a
    },
    { additions: 0, deletions: 0}
  )

  const irrelevantChanges = [packageChanges, ignoredChanges].reduce(
    (a, changes: {additions: number, deletions: number}) => (
      {
        additions: changes.additions + a.additions,
        deletions: changes.deletions + a.deletions
      }
    ),
    { additions: 0, deletions: 0}
  )

  // we exclude package-lock.json changes since they are generated
  return additions - irrelevantChanges.additions >= LINE_CUTOFF ||
    deletions - irrelevantChanges.deletions >= LINE_CUTOFF ||
    changedFiles >= FILE_CUTOFF
    ? {
        type: level,
        message: `[There is a lot of change in this PR. Maybe reduce scope?](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#change-size)
-- ${additions} added lines
-- ${deletions} deleted lines
-- ${changedFiles} files changed`,
      }
    : { type: 'none', message: '' }
}
