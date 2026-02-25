import {
  createMessage,
  createErrorMessage,
  createWarningMessage,
  looksGood,
} from './createMessage'
import lints from './lints'
import { Context, LintError, FullContext, Octokit, User, Config } from './types'
import { config } from './config'

const MARKER = '<!-- threepio -->'

export function shouldMessage(
  lints: { error: Array<LintError>; warning: Array<LintError> },
  action: string,
) {
  return action === 'opened' || lints.error.length + lints.warning.length > 0
}

export async function parse(context: Context): Promise<{
  message: string
  errors: Array<LintError>
  failed: boolean
  shouldComment: boolean
}> {
  const conf = config()
  const baseMessage = createMessage(context.action, context)
  const lintErrors = await lints(context, conf)

  const shouldComment = shouldMessage(lintErrors, context.action)

  return {
    message: shouldComment
      ? `${baseMessage}

${createErrorMessage(lintErrors.error)}

${createWarningMessage(lintErrors.warning)}`
      : ``,

    errors: lintErrors.error,
    failed: lintErrors.error.length > 0,
    shouldComment,
  }
}
export async function review(context: FullContext, github: Octokit) {
  const { repo } = context.payload.pull_request.head
  const { number: issueNumber } = context.payload.pull_request

  const files = await github.rest.pulls.listFiles({
    owner: repo.owner.login, // TODO: should be the name of the owner/username
    repo: repo.name, // TODO: should be the repo name
    pull_number: issueNumber,
  })

  const result = await parse({ ...context.payload, files: files.data })
  const comments = await github.rest.issues.listComments({
    issue_number: issueNumber,
    owner: repo.owner.login,
    repo: repo.name,
  })

  const threepioComment = comments.data
    .filter((c: { user: User; body?: string }) => {
      return (
        c.user.id === 41898282 &&
        c.user.login === 'github-actions[bot]' &&
        c.body?.includes(MARKER)
      )
    })
    .pop()

  if (threepioComment) {
    console.log('updating:')
    console.log(result.shouldComment ? result.message : looksGood())

    // update the comment
    await github.rest.issues.updateComment({
      comment_id: threepioComment.id,
      owner: repo.owner.login,
      repo: repo.name,
      body: `${MARKER}\n${result.shouldComment ? result.message : looksGood()}`,
    })
  } else if (result.shouldComment) {
    console.log('messaging:')
    console.log(result.message)

    await github.rest.issues.createComment({
      issue_number: issueNumber,
      owner: repo.owner.login,
      repo: repo.name,
      body: `${MARKER}\n${result.message}`,
    })
  }

  if (result.failed) {
    console.log('-----------------------------')
    console.log(result)
    return false
  }

  return true
}
