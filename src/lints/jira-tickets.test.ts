import { test as jiraTickets } from './jira-tickets'
import { generateStubContext, generateStubPullRequest } from '../test-helpers'

describe('#jiraTickets', () => {
  test('returns an error if no ticket ID', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test string with no JIRA id in it',
      }),
    })

    const { type, message } = await jiraTickets(fakeContext, 'error')

    expect(type).toBe('error')
    expect(message).toBe(
      '[No JIRA ticket found in PR body](https://github.com/designfrontier/threepio/blob/main/docs/rules.md#jira-ticket)'
    )
  })

  test('returns no error if ticket ID', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test with a SOLFLOW-1234 ticket id in it',
      }),
    })

    const { type } = await jiraTickets(fakeContext, 'warning')

    expect(type).toBe('none')
  })
})
