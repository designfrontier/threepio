import { LintError, LintErrorType, Context, File, RuleConfig } from '../types'

const EXCLUDE_EXTENSION = [
  'php',
  'yml',
  'xml',
  'yaml',
  'md',
  'json',
  'sql',
  'prisma',
  'gitignore',
  'npmrc',
  'scss',
  'css',
  'nvmrc',
  'tool-versions',
  'editorconfig',
  'threepio',
  'dockerfile',
  'prettierrc',
  'prettierignore',
]

const EXCLUDE_SUB_EXTENSIONS = ['d', 'config']

export async function test(
  context: Context,
  level: LintErrorType,
  config: RuleConfig,
): Promise<LintError> {
  const { files = [] } = context

  // get all files from the commits
  // if a corresponding test file exists good
  // if not, return an error

  const fileBuckets = files.reduce(
    (a: { testFiles: Array<string>; files: Array<string> }, file: File) => {
      const { filename } = file

      if (/[.](test|spec)[.]([jt]sx?)$/.test(filename)) {
        a.testFiles.push(filename)
      } else {
        a.files.push(filename)
      }

      return a
    },
    { testFiles: [], files: [] },
  )

  const needingTests = fileBuckets.files.filter((file) => {
    const filePart: Array<string> = file.split('.')
    const ext = filePart.pop() || ''
    const subExt = filePart[filePart.length - 1]?.toLowerCase()

    filePart.push('test', ext)

    return (
      !EXCLUDE_EXTENSION.includes(ext.toLowerCase()) &&
      !config?.exclude?.includes(file) &&
      file !== '.threepio' &&
      !ext.includes('/') && // this handles dot named folders with extension-less files
      filePart.length > 2 &&
      // this handles JS / TS config and typedef files (e.g. *.config.js, *.d.ts)
      !EXCLUDE_SUB_EXTENSIONS.includes(subExt) &&
      !fileBuckets.testFiles.includes(filePart.join('.'))
    )
  }, true)

  return needingTests.length > 0
    ? {
        type: level,
        message: `[No tests found for these files](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#all-files-tested)\n${needingTests
          .map((f) => `-- ${f}`)
          .join('\n')}`,
      }
    : { type: 'none', message: '' }
}
