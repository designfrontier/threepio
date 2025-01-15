import { LintError, Context } from './types'

type MessageParts = { [key: string]: (arg?: Context) => string }

const usage = `You tried to use an event Threepio doesn't understand yet`
const howToReview = `<details>
  <summary><h3>Reminders of how to do a good code review</h3></summary>

  1. Read through the ticket so you know what should be accomplished
  2. Read through the code and make sure you understand what it should be doing
  3. Checkout the code locally and get it running
  4. Run through the use cases in the ticket / test plan to make sure they work
  5. Leave comments and questions
  6. Decide to approve, or request changes
</details>
`

const messageParts: MessageParts = {
  opened() {
    return howToReview
  },
  push() {
    return howToReview
  },
  synchronize() {
    return howToReview
  },
  edited() {
    return howToReview
  },
  looksGood() {
    return `## Threepio says: Looks Good!

![bb8 thumbs up](https://media.giphy.com/media/3o7abB06u9bNzA8lu8/giphy.gif)`
  },
}

function createLintMessage(
  lints: Array<LintError>,
  type: 'errors' | 'warnings',
): string {
  if (lints.length === 0) {
    return ''
  }
  const headers = {
    errors: '### Errors That Need Correction Before Merging',
    warnings: '#### Things That Need Reviewer Attention',
  }

  return `${headers[type]}
${lints.reduce((m, e) => {
  return e?.message
    ? `${m}
- ${e.message}`
    : m
}, '')}`
}

export function looksGood() {
  return messageParts['looksGood']()
}

export function createMessage(eventType = 'opened', context: Context) {
  return messageParts[eventType] ? messageParts[eventType](context) : usage
}

export function createErrorMessage(errors: Array<LintError>): string {
  return createLintMessage(errors, 'errors')
}

export function createWarningMessage(warnings: Array<LintError>): string {
  return createLintMessage(warnings, 'warnings')
}
