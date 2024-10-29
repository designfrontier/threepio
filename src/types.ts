type Maybe<T> = T | null | undefined | void

export type Config = {
  tests: {
    [key: string]: 'error' | 'warn'
  }
  jira: {
    projects: string[]
  }
  rules: {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
}

export type RuleConfig = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type LintErrorType = 'error' | 'none' | 'warning'

export type LintError = {
  type: LintErrorType
  message: string
  data?: { [key: string]: any }
}

type FileReturn = {
  data: Array<File>
}

export type Octokit = {
  rest: {
    pulls: {
      listFiles: (a: {
        owner: string
        repo: string
        pull_number: number
      }) => Promise<FileReturn>
    }
    issues: {
      listComments: (a: {
        owner: string
        repo: string
        issue_number: number
      }) => Promise<{ data: Array<{ id: number; user: User }> }>
      createComment: (a: {
        owner: string
        repo: string
        issue_number: number
        body: string
      }) => void
      updateComment: (a: {
        owner: string
        repo: string
        comment_id: number
        body: string
      }) => void
    }
  }
}

export type File = {
  sha: string
  filename: string
  status: string
  additions: number
  deletions: number
  changes: number
  blob_url: string
  raw_url: string
  contents_url: string
  patch: string
}

export type Context = {
  action: string
  number: number
  changes?: any
  files: Array<File>
  pull_request: PullRequest
  repository?: Repository
  organization?: any
  installation?: any
  sender?: any
}

export type FullContext = {
  payload: {
    action: string
    number: number
    changes?: any
    pull_request: PullRequest
    repository?: Repository
    organization?: any
    installation?: any
    sender?: any
  }
}

export type User = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export type PullRequest = {
  url: string
  id: number
  node_id: string
  html_url: string
  diff_url: string
  patch_url: string
  issue_url: string
  commits_url: string
  review_comments_url: string
  review_comment_url: string
  comments_url: string
  statuses_url: string
  number: number
  state: string
  locked: boolean
  title: string
  user: User
  body: string
  labels: Array<{
    id: number
    node_id: string
    url: string
    name: string
    description: string
    color: string
    default: boolean
  }>
  milestone: Maybe<{
    url: string
    html_url: string
    labels_url: string
    id: number
    node_id: string
    number: number
    state: string
    title: string
    description: string
    creator: User
    open_issues: number
    closed_issues: number
    created_at: string
    updated_at: string
    closed_at: string
    due_on: string
  }>
  active_lock_reason: Maybe<string>
  created_at: string
  updated_at: string
  closed_at: Maybe<string>
  merged_at: Maybe<string>
  merge_commit_sha: string
  assignee: Maybe<User>
  assignees: Array<User>
  requested_reviewers: Array<User>
  head: {
    label: string
    ref: string
    sha: string
    user: User
    repo: Repository
  }
  base: {
    label: string
    ref: string
    sha: string
    user: User
    repo: Repository
  }
  _links: {
    self: {
      href: string
    }
    html: {
      href: string
    }
    issue: {
      href: string
    }
    comments: {
      href: string
    }
    review_comments: {
      href: string
    }
    review_comment: {
      href: string
    }
    commits: {
      href: string
    }
    statuses: {
      href: string
    }
  }
  author_association: string
  auto_merge: null
  draft: boolean
  merged: boolean
  mergeable: Maybe<boolean>
  rebaseable: Maybe<boolean>
  mergeable_state: string
  merged_by: Maybe<User>
  comments: number
  review_comments: number
  maintainer_can_modify: boolean
  commits: number
  additions: number
  deletions: number
  changed_files: number
}

export type Repository = {
  allow_auto_merge?: boolean
  allow_forking: boolean
  allow_merge_commit?: boolean
  allow_rebase_merge?: boolean
  allow_squash_merge?: boolean
  allow_update_branch?: boolean
  archive_url: string
  archived: boolean
  assignees_url: string
  blobs_url: string
  branches_url: string
  clone_url: string
  collaborators_url: string
  comments_url: string
  commits_url: string
  compare_url: string
  contents_url: string
  contributors_url: string
  created_at: string
  default_branch: string
  delete_branch_on_merge?: boolean
  deployments_url: string
  description: string
  disabled: boolean
  downloads_url: string
  events_url: string
  fork: boolean
  forks: number
  forks_count: number
  forks_url: string
  full_name: string
  git_commits_url: string
  git_refs_url: string
  git_tags_url: string
  git_url: string
  has_downloads: boolean
  has_issues: boolean
  has_pages: boolean
  has_projects: boolean
  has_wiki: boolean
  homepage: string
  hooks_url: string
  html_url: string
  id: number
  is_template: boolean
  issue_comment_url: string
  issue_events_url: string
  issues_url: string
  keys_url: string
  labels_url: string
  language: string
  languages_url: string
  license: Maybe<{
    key: string
    name: string
    url: string
    spdx_id: string
    node_id: string
    html_url: string
  }>
  merges_url: string
  milestones_url: string
  mirror_url: Maybe<string>
  name: string
  node_id: string
  notifications_url: string
  open_issues: number
  open_issues_count: number
  owner: User
  private: boolean
  pulls_url: string
  pushed_at: string
  releases_url: string
  size: number
  ssh_url: string
  stargazers_count: number
  stargazers_url: string
  statuses_url: string
  subscribers_url: string
  subscription_url: string
  svn_url: string
  tags_url: string
  teams_url: string
  topics: Array<string>
  trees_url: string
  updated_at: string
  use_squash_pr_title_as_default?: boolean
  visibility: string
  watchers: number
  watchers_count: number
}
