import { test as changeSize } from './change-size'
import {
  generateStubContext,
  generateStubPullRequest,
  generateFile,
} from '../test-helpers'

describe('#changeSize', () => {
  test('returns a warning if lots of changes', async () => {
    const fakeContext = generateStubContext({
      files: [
        'test.js',
        'test.test.js',
        'index.ts',
        'index.test.ts',
        'main.tsx',
      ].map((f) =>
        generateFile({
          filename: f,
          additions: 100,
          deletions: 1005,
          changes: 1100,
        }),
      ),
      pull_request: generateStubPullRequest({
        additions: 500,
        deletions: 5005,
        changed_files: 5,
      }),
    })

    const { type, message } = await changeSize(fakeContext, 'warning', {})

    expect(type).toBe('warning')
    expect(message)
      .toBe(`[There is a lot of change in this PR. Maybe reduce scope?](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#change-size)
-- 500 added lines
-- 5005 deleted lines
-- 5 files changed`)
  })

  test('ignores changes to package-lock.json', async () => {
    const fakeContext = generateStubContext({
      files: ['package-lock.json'].map((f) =>
        generateFile({
          filename: f,
          additions: 10000,
          deletions: 5000,
          changes: 15000,
        }),
      ),
      pull_request: generateStubPullRequest({
        additions: 10000,
        deletions: 500,
        changed_files: 1,
      }),
    })

    const { type, message } = await changeSize(fakeContext, 'warning', {})

    expect(type).toBe('none')
    expect(message).toBe(``)
  })

  test('ignores files matching provided ignore globs', async () => {
    const fakeContext = generateStubContext({
      files: ['src/main/foobar.txt', 'src/test/foobar.txt'].map((f) =>
        generateFile({
          filename: f,
          additions: 250,
          deletions: 250,
          changes: 500,
        }),
      ),
      pull_request: generateStubPullRequest({
        additions: 500,
        deletions: 500,
        changed_files: 2,
      }),
    })

    const { type, message } = await changeSize(fakeContext, 'warning', {
      ignoredGlobs: ['src/test/*']
    })

    expect(type).toBe('none')
    expect(message).toBe(``)
  })

  test('only ignores files matching provided ignore globs once if matching multiple globs', async () => {
    const fakeContext = generateStubContext({
      files: ['src/main/foobar.txt', 'src/test/foobar.txt'].map((f) =>
        generateFile({
          filename: f,
          additions: 500,
          deletions: 500,
          changes: 1000,
        }),
      ),
      pull_request: generateStubPullRequest({
        additions: 1000,
        deletions: 1000,
        changed_files: 2,
      }),
    })

    const { type, message } = await changeSize(fakeContext, 'warning', {
      ignoredGlobs: ['src/test/*', 'src/test/*.txt']
    })

    expect(type).toBe('warning')
    expect(message).toBe(`[There is a lot of change in this PR. Maybe reduce scope?](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#change-size)
-- 1000 added lines
-- 1000 deleted lines
-- 2 files changed`)
  })
})
