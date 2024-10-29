import lints from './index'
import { config } from '../config'

import {
  generateStubContext,
  generateStubPullRequest,
  generateFile,
} from '../test-helpers'

describe('#lints', () => {
  test('returns errors as expected', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test string with no JIRA id in it',
      }),
      files: [
        'test.js',
        'test.test.js',
        'index.ts',
        'index.test.ts',
        'license',
      ].map((f) => generateFile({ filename: f })),
    })

    const res = await lints(fakeContext, config())

    expect(res.warning.length).toBe(0)
    expect(res.error.length).toBe(2)
    expect(res.none.length).toBe(3)
  })
})
