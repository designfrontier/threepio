import { LintError, LintErrorType, Context, File } from '../types'

const LINE_CUTOFF = 500
const FILE_CUTOFF = 10

export async function test(
  context: Context,
  level: LintErrorType,
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

  // we exclude package-lock.json changes since they are generated
  return additions - packageChanges.additions >= LINE_CUTOFF ||
    deletions - packageChanges.deletions >= LINE_CUTOFF ||
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
