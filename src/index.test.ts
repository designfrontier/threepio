import { shouldMessage, parse, review } from './index'
import { generateFile, generateUserStub, getContext } from './test-helpers'

describe('#shouldMessage', () => {
  test('should return true if opened event', () => {
    expect(shouldMessage({ error: [], warning: [] }, 'opened')).toBe(true)
  })

  test('should return true if errors', () => {
    expect(
      shouldMessage(
        { error: [{ type: 'error', message: 'an error' }], warning: [] },
        'updated',
      ),
    ).toBe(true)
  })

  test('should return true if warnings', () => {
    expect(
      shouldMessage(
        { error: [], warning: [{ type: 'warning', message: 'a warning' }] },
        'updated',
      ),
    ).toBe(true)
  })

  test('should return true if warnings and errors', () => {
    expect(
      shouldMessage(
        {
          error: [{ type: 'error', message: 'an error' }],
          warning: [{ type: 'warning', message: 'a warning' }],
        },
        'updated',
      ),
    ).toBe(true)
  })
})

describe('#review', () => {
  test('if should load files from the API', async () => {
    const restStub = {
      pulls: {
        listFiles: jest.fn(async () => {
          return {
            data: ['test.js', 'index.ts', 'index.test.ts'].map((f) =>
              generateFile({ filename: f }),
            ),
          }
        }),
      },
      issues: {
        listComments: jest.fn(async () => {
          return {
            data: [
              {
                id: 1,
                user: generateUserStub({
                  id: 41898282,
                  login: 'github-actions[bot]',
                }),
              },
            ],
          }
        }),
        createComment: jest.fn(),
        updateComment: jest.fn(),
      },
    }

    expect(
      await review(
        {
          payload: getContext().payload,
        },
        {
          rest: restStub,
        },
      ),
    ).toBe(true)

    expect(restStub.pulls.listFiles).toHaveBeenCalledTimes(1)
  })

  test('if there is a comment it should update it', async () => {
    const restStub = {
      pulls: {
        listFiles: jest.fn(async () => {
          return {
            data: ['test.js', 'index.ts', 'index.test.ts'].map((f) =>
              generateFile({ filename: f }),
            ),
          }
        }),
      },
      issues: {
        listComments: jest.fn(async () => {
          return {
            data: [
              {
                id: 1,
                user: generateUserStub({
                  id: 41898282,
                  login: 'github-actions[bot]',
                }),
              },
            ],
          }
        }),
        createComment: jest.fn(),
        updateComment: jest.fn(),
      },
    }

    expect(
      await review(
        {
          payload: getContext().payload,
        },
        {
          rest: restStub,
        },
      ),
    ).toBe(true)

    expect(restStub.issues.listComments).toHaveBeenCalledTimes(1)
    expect(restStub.issues.updateComment).toHaveBeenCalledTimes(1)
    expect(restStub.issues.createComment).toHaveBeenCalledTimes(0)
  })

  test('if there is not a comment it should create one', async () => {
    const restStub = {
      pulls: {
        listFiles: jest.fn(async () => {
          return {
            data: ['test.js', 'index.ts', 'index.test.ts'].map((f) =>
              generateFile({ filename: f }),
            ),
          }
        }),
      },
      issues: {
        listComments: jest.fn(async () => {
          return {
            data: [
              {
                id: 1,
                user: generateUserStub({
                  id: 123,
                  login: 'Frank',
                }),
              },
            ],
          }
        }),
        createComment: jest.fn(),
        updateComment: jest.fn(),
      },
    }

    expect(
      await review(
        {
          payload: getContext().payload,
        },
        {
          rest: restStub,
        },
      ),
    ).toBe(true)

    expect(restStub.issues.listComments).toHaveBeenCalledTimes(1)
    expect(restStub.issues.updateComment).toHaveBeenCalledTimes(0)
    expect(restStub.issues.createComment).toHaveBeenCalledTimes(1)
  })
})

describe('#parse', () => {
  test('should parse', async () => {
    const context = getContext()

    expect(
      await parse({
        files: ['test.js', 'test.test.js', 'index.ts', 'index.test.ts'].map(
          (f) => generateFile({ filename: f }),
        ),
        ...context.payload,
      }),
    ).toStrictEqual({
      errors: [],
      failed: false,
      message: '',
      shouldComment: false,
    })
  })
})
