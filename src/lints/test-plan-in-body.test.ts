import { test as testPlanCheck } from './test-plan-in-body'
import { generateStubContext, generateStubPullRequest } from '../test-helpers'

describe('#testPlanCheck', () => {
  test('returns an error if no test plan', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test string with no test plan in it',
      }),
    })

    const { type, message } = await testPlanCheck(fakeContext, 'error')

    expect(type).toBe('error')
    expect(message).toBe(
      '[No Test Plan found in PR body](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#test-plan-in-body)',
    )
  })

  test('returns no error if test plan present', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test with a\n Test Plan:\n - read the ticket id\n - in it\n \n JIRA:Solflow-test',
      }),
    })
    const { type } = await testPlanCheck(fakeContext, 'error')
    expect(type).toBe('none')
  })

  test('returns no error if test plan present with asterisks', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test with a\n Test Plan:\n * read the ticket id\n * in it\n \n JIRA:Solflow-test',
      }),
    })

    const { type } = await testPlanCheck(fakeContext, 'error')
    expect(type).toBe('none')
  })

  test('returns no error if test plan present with numbered list', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test with a\n Test Plan:\n 1. read the ticket id\n 2. in it\n \n JIRA:Solflow-test',
      }),
    })

    const { type } = await testPlanCheck(fakeContext, 'error')
    expect(type).toBe('none')
  })

  test('returns no error if test plan present for varied spacing', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test with a\n Test plan:  \n\n - read the ticket id\n - in it\n \n JIRA:Solflow-test',
      }),
    })

    const { type } = await testPlanCheck(fakeContext, 'error')
    expect(type).toBe('none')
  })
})
