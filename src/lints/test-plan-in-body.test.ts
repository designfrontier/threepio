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

  test('returns no error if test plan is free-form text', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test with a\n Test Plan:\n Manually verified the happy path in staging.',
      }),
    })

    const { type } = await testPlanCheck(fakeContext, 'error')
    expect(type).toBe('none')
  })

  test('returns no error if test plan has unchecked checkboxes with real content', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'Test Plan:\n - [ ] Verify the login flow works\n - [ ] Check edge cases',
      }),
    })

    const { type } = await testPlanCheck(fakeContext, 'error')
    expect(type).toBe('none')
  })

  test('returns an error if test plan section is blank', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test with a\n Test Plan:\n\n',
      }),
    })

    const { type, message } = await testPlanCheck(fakeContext, 'error')
    expect(type).toBe('error')
    expect(message).toBe(
      '[No Test Plan found in PR body](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#test-plan-in-body)',
    )
  })

  test('returns an error if test plan is the default template placeholder', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'Test Plan:\n - [ ] List of testing instructions',
      }),
    })

    const { type, message } = await testPlanCheck(fakeContext, 'error')
    expect(type).toBe('error')
    expect(message).toBe(
      '[No Test Plan found in PR body](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#test-plan-in-body)',
    )
  })

  test('returns an error if test plan only has TODOs', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'Test Plan:\n TODO: fill this in',
      }),
    })

    const { type, message } = await testPlanCheck(fakeContext, 'error')
    expect(type).toBe('error')
    expect(message).toBe(
      '[No Test Plan found in PR body](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#test-plan-in-body)',
    )
  })

  test('returns no error if test plan has bullets with text', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'Test Plan:\n - verify the feature works\n - check edge cases',
      }),
    })

    const { type } = await testPlanCheck(fakeContext, 'error')
    expect(type).toBe('none')
  })

  test('returns an error if test plan only has empty bullets', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'Test Plan:\n -\n -\n *',
      }),
    })

    const { type } = await testPlanCheck(fakeContext, 'error')
    expect(type).toBe('error')
  })

  test('returns an error if test plan only has TODOs regardless of casing', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'Test Plan:\n todo: fill this in',
      }),
    })

    const { type } = await testPlanCheck(fakeContext, 'error')
    expect(type).toBe('error')
  })
})
