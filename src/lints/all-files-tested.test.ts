import { test as allFilesTested } from './all-files-tested'
import { generateStubContext, generateFile } from '../test-helpers'

describe('#allFilesTested', () => {
  test('returns no warnings or errors if no files', async () => {
    const fakeContext = generateStubContext({})

    const { type } = await allFilesTested(fakeContext, 'warning', {})

    expect(type).toBe('none')
  })

  test('returns a warning for files missing tests', async () => {
    const fakeContext = generateStubContext({
      files: [
        'test.js',
        'test.test.js',
        'index.ts',
        'index.test.ts',
        'main.tsx',
      ].map((f) => generateFile({ filename: f })),
    })

    const { type, message } = await allFilesTested(fakeContext, 'warning', {})

    expect(type).toBe('warning')
    expect(message)
      .toBe(`[No tests found for these files](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#all-files-tested)
-- main.tsx`)
  })

  test('returns no warning if all files covered', async () => {
    const fakeContext = generateStubContext({
      files: ['test.js', 'test.test.js', 'index.ts', 'index.test.ts'].map((f) =>
        generateFile({ filename: f }),
      ),
    })
    const { type } = await allFilesTested(fakeContext, 'warning', {})
    expect(type).toBe('none')
  })

  test('returns no warning if all files covered', async () => {
    const fakeContext = generateStubContext({
      files: [
        'test.js',
        'test.test.js',
        'index.ts',
        'index.test.ts',
        'license',
        '.github/workflows/lints.yml',
        '.github/workflows/list.yaml',
        '.husky/pre-commit',
        'database/do-not-test.sql',
        'database/main.prisma',
        'playwright/e2e.spec.ts',
      ].map((f) => generateFile({ filename: f })),
    })

    const { type } = await allFilesTested(fakeContext, 'warning', {})
    expect(type).toBe('none')
  })

  test('returns no warning for excluded file types', async () => {
    const fakeContext = generateStubContext({
      files: [
        'app.php',
        '.eslintrc.yml',
        'graphql-codegen.yaml',
        'README.md',
        'package.json',
        'migration.sql',
        'schema.prisma',
        '.gitignore',
        '.npmrc',
        'playwright.config.js',
        'variables.scss',
        'tailwind.css',
        'types.d.ts',
      ].map((f) => generateFile({ filename: f })),
    })

    const { type } = await allFilesTested(fakeContext, 'warning', {})
    expect(type).toBe('none')
  })

  test('returns no warning for excluded files', async () => {
    const fakeContext = generateStubContext({
      files: [
        'app.php',
        '.eslintrc.yml',
        'graphql-codegen.yaml',
        'README.md',
        'package.json',
        'migration.sql',
        'schema.prisma',
        '.gitignore',
        '.npmrc',
        'playwright.config.js',
        'variables.scss',
        'tailwind.css',
        'types.d.ts',
        './src/types.ts',
      ].map((f) => generateFile({ filename: f })),
    })

    const { type } = await allFilesTested(fakeContext, 'warning', {
      exclude: ['./src/types.ts'],
    })
    expect(type).toBe('none')
  })

  test('returns no warning for deleted files', async () => {
    const fakeContext = generateStubContext({
      files: ['deleted.ts'].map((f) =>
        generateFile({ filename: f, status: 'removed' }),
      ),
    })
    const { type } = await allFilesTested(fakeContext, 'warning', {
      exclude: ['./src/types.ts'],
    })
    expect(type).toBe('none')
  })
})
