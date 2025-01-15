import { writeFileSync, unlinkSync, cpSync } from 'fs'
import { Context, User, Repository, PullRequest, File } from '../types'

export function generateConfigFile(conf: string) {
  const testFile = `${process.cwd()}/.threepio`
  const cached = `${process.cwd()}/cached.threepio`

  cpSync(testFile, cached)
  writeFileSync(testFile, conf)
}

export function cacheConfigFile() {
  const testFile = `${process.cwd()}/.threepio`
  const cached = `${process.cwd()}/cached.threepio`

  cpSync(testFile, cached)
  unlinkSync(testFile)
}

export function restoreConfigFile() {
  const testFile = `${process.cwd()}/.threepio`
  const cached = `${process.cwd()}/cached.threepio`

  try {
    unlinkSync(testFile)
  } catch (e) {} //eslint-disable-line no-empty

  cpSync(cached, testFile)
  unlinkSync(cached)
}

export function generateFile(args: {
  filename?: string
  additions?: number
  deletions?: number
  changes?: number
}): File {
  return {
    filename: 'fileName.ts',
    sha: 'this-is-a-fake-file-sha',
    status: 'modified',
    additions: 10,
    deletions: 5,
    changes: 2,
    blob_url: 'https://this-is-not-real',
    raw_url: 'https://this-is-not-real',
    contents_url: 'https://this-is-not-real',
    patch: '',
    ...args,
  }
}

export function generateUserStub(args?: any): User {
  return {
    login: 'starlord',
    id: 1,
    node_id: '1',
    avatar_url: 'https://this-is-my-url.conm/avatar.png',
    gravatar_id: 'scoobydoo123',
    url: 'https://this-is-my-url.conm/avatar.png',
    html_url: 'https://this-is-my-url.conm/avatar.png',
    followers_url: 'https://this-is-my-url.conm/avatar.png',
    following_url: 'https://this-is-my-url.conm/avatar.png',
    gists_url: 'https://this-is-my-url.conm/avatar.png',
    starred_url: 'https://this-is-my-url.conm/avatar.png',
    subscriptions_url: 'https://this-is-my-url.conm/avatar.png',
    organizations_url: 'https://this-is-my-url.conm/avatar.png',
    repos_url: 'https://this-is-my-url.conm/avatar.png',
    events_url: 'https://this-is-my-url.conm/avatar.png',
    received_events_url: 'https://this-is-my-url.conm/avatar.png',
    type: 'user',
    site_admin: true,

    ...args,
  }
}

export function generateRepoStub(args?: any): Repository {
  return {
    id: 1,
    node_id: '1',
    name: 'This is the name of the repo',
    full_name: 'This is the name of the repo',
    owner: generateUserStub(),
    private: true,
    html_url: 'https://this-is-my-url',
    description: 'this is the repo description',
    fork: true,
    url: 'https://this-is-my-url',
    archive_url: 'https://this-is-my-url',
    assignees_url: 'https://this-is-my-url',
    blobs_url: 'https://this-is-my-url',
    branches_url: 'https://this-is-my-url',
    collaborators_url: 'https://this-is-my-url',
    comments_url: 'https://this-is-my-url',
    commits_url: 'https://this-is-my-url',
    compare_url: 'https://this-is-my-url',
    contents_url: 'https://this-is-my-url',
    contributors_url: 'https://this-is-my-url',
    deployments_url: 'https://this-is-my-url',
    downloads_url: 'https://this-is-my-url',
    events_url: 'https://this-is-my-url',
    forks_url: 'https://this-is-my-url',
    git_commits_url: 'https://this-is-my-url',
    git_refs_url: 'https://this-is-my-url',
    git_tags_url: 'https://this-is-my-url',
    git_url: 'https://this-is-my-url',
    issue_comment_url: 'https://this-is-my-url',
    issue_events_url: 'https://this-is-my-url',
    issues_url: 'https://this-is-my-url',
    keys_url: 'https://this-is-my-url',
    labels_url: 'https://this-is-my-url',
    languages_url: 'https://this-is-my-url',
    merges_url: 'https://this-is-my-url',
    milestones_url: 'https://this-is-my-url',
    notifications_url: 'https://this-is-my-url',
    pulls_url: 'https://this-is-my-url',
    releases_url: 'https://this-is-my-url',
    ssh_url: 'https://this-is-my-url',
    stargazers_url: 'https://this-is-my-url',
    statuses_url: 'https://this-is-my-url',
    subscribers_url: 'https://this-is-my-url',
    subscription_url: 'https://this-is-my-url',
    tags_url: 'https://this-is-my-url',
    teams_url: 'https://this-is-my-url',
    trees_url: 'https://this-is-my-url',
    clone_url: 'https://this-is-my-url',
    mirror_url: 'https://this-is-my-url',
    hooks_url: 'https://this-is-my-url',
    svn_url: 'https://this-is-my-url',
    homepage: 'https://this-is-my-url',
    language: null,
    forks_count: 1,
    stargazers_count: 1,
    watchers_count: 1,
    size: 1,
    default_branch: 'main',
    open_issues_count: 1,
    topics: ['test'],
    has_issues: true,
    has_projects: true,
    has_wiki: true,
    has_pages: true,
    has_downloads: true,
    archived: true,
    disabled: true,
    pushed_at: '1 January 2022',
    created_at: '1 January 2022',
    updated_at: '1 January 2022',
    permissions: {
      admin: true,
      push: true,
      pull: true,
    },
    allow_rebase_merge: true,
    temp_clone_token: 'temp-clone-token-fake',
    allow_squash_merge: true,
    allow_merge_commit: true,
    allow_forking: true,
    forks: 1,
    open_issues: 1,
    watchers: 1,

    ...args,
  }
}

export function generateStubPullRequest(args?: any): PullRequest {
  return {
    url: 'https://this-is-a-url.com',
    id: 1,
    node_id: '1234',
    html_url: 'https://this-is-a-url.com',
    diff_url: 'https://this-is-a-url.com',
    patch_url: 'https://this-is-a-url.com',
    issue_url: 'https://this-is-a-url.com',
    commits_url: 'https://this-is-a-url.com',
    review_comments_url: 'https://this-is-a-url.com',
    review_comment_url: 'https://this-is-a-url.com',
    comments_url: 'https://this-is-a-url.com',
    statuses_url: 'https://this-is-a-url.com',
    number: 1,
    state: 'open',
    locked: true,
    title: 'This is a PR title!',
    user: generateUserStub(),
    body: 'the default body string',
    labels: [
      {
        id: 1,
        node_id: '1',
        url: 'https://this-is-my-url.conm/avatar.png',
        name: 'a label',
        description: 'this is a label and description',
        color: 'ffccff',
        default: true,
      },
    ],
    milestone: {
      url: 'https://this-is-my-milestone',
      html_url: 'https://this-is-my-milestone',
      labels_url: 'https://this-is-my-milestone',
      id: 1,
      node_id: '1',
      number: 1,
      state: 'open',
      title: 'this is a milestone',
      description: 'this is a milestone description',
      creator: generateUserStub(),
      open_issues: 1,
      closed_issues: 1,
      created_at: '1 January 2022',
      updated_at: '1 January 2022',
      closed_at: '1 January 2022',
      due_on: '1 January 2022',
    },
    active_lock_reason: 'locked for reasons',
    created_at: '1 January 2022',
    updated_at: '1 January 2022',
    closed_at: '1 January 2022',
    merged_at: '1 January 2022',
    merge_commit_sha: 'thisisnotreallyaSHA',
    assignees: [],
    requested_reviewers: [],
    head: {
      label: 'a label',
      ref: 'this-is-a-ref',
      sha: 'thisisnotreallyaSHA',
      user: generateUserStub(),
      repo: generateRepoStub(),
    },
    base: {
      label: 'a-label',
      ref: 'this-is-a-ref',
      sha: 'thisisnotreallyaSHA',
      user: generateUserStub(),
      repo: generateRepoStub(),
    },
    _links: {
      self: {
        href: 'https://url/for/links',
      },
      html: {
        href: 'https://url/for/links',
      },
      issue: {
        href: 'https://url/for/links',
      },
      comments: {
        href: 'https://url/for/links',
      },
      review_comments: {
        href: 'https://url/for/links',
      },
      review_comment: {
        href: 'https://url/for/links',
      },
      commits: {
        href: 'https://url/for/links',
      },
      statuses: {
        href: 'https://url/for/links',
      },
    },
    author_association: 'author-associated',
    auto_merge: null,
    draft: true,
    merged: true,
    mergeable: true,
    rebaseable: true,
    mergeable_state: 'mergable',
    comments: 1,
    review_comments: 1,
    maintainer_can_modify: true,
    commits: 1,
    additions: 1,
    deletions: 1,
    changed_files: 1,

    ...args,
  }
}

export function getContext() {
  return {
    payload: {
      action: 'synchronize',
      after: 'cd0e22269b2269bf9538db043de33f3faf9ae361',
      before: 'd9bd4048a59371561195430b6f4bd73333a36ba1',
      number: 341,
      organization: {
        avatar_url: 'https://avatars.githubusercontent.com/u/85465133?v=4',
        description: '',
        events_url: 'https://api.github.com/orgs/ansble/events',
        hooks_url: 'https://api.github.com/orgs/ansble/hooks',
        id: 85465133,
        issues_url: 'https://api.github.com/orgs/ansble/issues',
        login: 'ansble',
        members_url: 'https://api.github.com/orgs/ansble/members{/member}',
        node_id: 'MDEyOk9yZ2FuaXphdGlvbjg1NDY1MTMz',
        public_members_url:
          'https://api.github.com/orgs/ansble/public_members{/member}',
        repos_url: 'https://api.github.com/orgs/ansble/repos',
        url: 'https://api.github.com/orgs/ansble',
      },
      pull_request: {
        _links: {
          comments: {
            href: 'https://api.github.com/repos/ansble/threepio/issues/341/comments',
          },
          commits: {
            href: 'https://api.github.com/repos/ansble/threepio/pulls/341/commits',
          },
          html: {
            href: 'https://github.com/ansble/threepio/pull/341',
          },
          issue: {
            href: 'https://api.github.com/repos/ansble/threepio/issues/341',
          },
          review_comment: {
            href: 'https://api.github.com/repos/ansble/threepio/pulls/comments{/number}',
          },
          review_comments: {
            href: 'https://api.github.com/repos/ansble/threepio/pulls/341/comments',
          },
          self: {
            href: 'https://api.github.com/repos/ansble/threepio/pulls/341',
          },
          statuses: {
            href: 'https://api.github.com/repos/ansble/threepio/statuses/cd0e22269b2269bf9538db043de33f3faf9ae361',
          },
        },
        active_lock_reason: null,
        additions: 43,
        assignee: null,
        assignees: [],
        author_association: 'CONTRIBUTOR',
        auto_merge: null,
        base: {
          label: 'ansble:master',
          ref: 'master',
          repo: {
            allow_auto_merge: false,
            allow_forking: false,
            allow_merge_commit: false,
            allow_rebase_merge: true,
            allow_squash_merge: true,
            allow_update_branch: true,
            archive_url:
              'https://api.github.com/repos/ansble/threepio/{archive_format}{/ref}',
            archived: false,
            assignees_url:
              'https://api.github.com/repos/ansble/threepio/assignees{/user}',
            blobs_url:
              'https://api.github.com/repos/ansble/threepio/git/blobs{/sha}',
            branches_url:
              'https://api.github.com/repos/ansble/threepio/branches{/branch}',
            clone_url: 'https://github.com/ansble/threepio.git',
            collaborators_url:
              'https://api.github.com/repos/ansble/threepio/collaborators{/collaborator}',
            comments_url:
              'https://api.github.com/repos/ansble/threepio/comments{/number}',
            commits_url:
              'https://api.github.com/repos/ansble/threepio/commits{/sha}',
            compare_url:
              'https://api.github.com/repos/ansble/threepio/compare/{base}...{head}',
            contents_url:
              'https://api.github.com/repos/ansble/threepio/contents/{+path}',
            contributors_url:
              'https://api.github.com/repos/ansble/threepio/contributors',
            created_at: '2021-11-22T16:41:27Z',
            default_branch: 'master',
            delete_branch_on_merge: true,
            deployments_url:
              'https://api.github.com/repos/ansble/threepio/deployments',
            description:
              'API built with Node.js used for the back-end of Solflow',
            disabled: false,
            downloads_url:
              'https://api.github.com/repos/ansble/threepio/downloads',
            events_url: 'https://api.github.com/repos/ansble/threepio/events',
            fork: false,
            forks: 0,
            forks_count: 0,
            forks_url: 'https://api.github.com/repos/ansble/threepio/forks',
            full_name: 'ansble/threepio',
            git_commits_url:
              'https://api.github.com/repos/ansble/threepio/git/commits{/sha}',
            git_refs_url:
              'https://api.github.com/repos/ansble/threepio/git/refs{/sha}',
            git_tags_url:
              'https://api.github.com/repos/ansble/threepio/git/tags{/sha}',
            git_url: 'git://github.com/ansble/threepio.git',
            has_downloads: true,
            has_issues: true,
            has_pages: false,
            has_projects: false,
            has_wiki: true,
            homepage: '',
            hooks_url: 'https://api.github.com/repos/ansble/threepio/hooks',
            html_url: 'https://github.com/ansble/threepio',
            id: 430787584,
            is_template: false,
            issue_comment_url:
              'https://api.github.com/repos/ansble/threepio/issues/comments{/number}',
            issue_events_url:
              'https://api.github.com/repos/ansble/threepio/issues/events{/number}',
            issues_url:
              'https://api.github.com/repos/ansble/threepio/issues{/number}',
            keys_url:
              'https://api.github.com/repos/ansble/threepio/keys{/key_id}',
            labels_url:
              'https://api.github.com/repos/ansble/threepio/labels{/name}',
            language: 'JavaScript',
            languages_url:
              'https://api.github.com/repos/ansble/threepio/languages',
            license: null,
            merges_url: 'https://api.github.com/repos/ansble/threepio/merges',
            milestones_url:
              'https://api.github.com/repos/ansble/threepio/milestones{/number}',
            mirror_url: null,
            name: 'threepio',
            node_id: 'R_kgDOGa1MAA',
            notifications_url:
              'https://api.github.com/repos/ansble/threepio/notifications{?since,all,participating}',
            open_issues: 12,
            open_issues_count: 12,
            owner: {
              avatar_url:
                'https://avatars.githubusercontent.com/u/85465133?v=4',
              events_url:
                'https://api.github.com/users/ansble/events{/privacy}',
              followers_url: 'https://api.github.com/users/ansble/followers',
              following_url:
                'https://api.github.com/users/ansble/following{/other_user}',
              gists_url: 'https://api.github.com/users/ansble/gists{/gist_id}',
              gravatar_id: '',
              html_url: 'https://github.com/ansble',
              id: 85465133,
              login: 'ansble',
              node_id: 'MDEyOk9yZ2FuaXphdGlvbjg1NDY1MTMz',
              organizations_url: 'https://api.github.com/users/ansble/orgs',
              received_events_url:
                'https://api.github.com/users/ansble/received_events',
              repos_url: 'https://api.github.com/users/ansble/repos',
              site_admin: false,
              starred_url:
                'https://api.github.com/users/ansble/starred{/owner}{/repo}',
              subscriptions_url:
                'https://api.github.com/users/ansble/subscriptions',
              type: 'Organization',
              url: 'https://api.github.com/users/ansble',
            },
            private: true,
            pulls_url:
              'https://api.github.com/repos/ansble/threepio/pulls{/number}',
            pushed_at: '2022-06-09T15:59:53Z',
            releases_url:
              'https://api.github.com/repos/ansble/threepio/releases{/id}',
            size: 2624,
            ssh_url: 'git@github.com:ansble/threepio.git',
            stargazers_count: 0,
            stargazers_url:
              'https://api.github.com/repos/ansble/threepio/stargazers',
            statuses_url:
              'https://api.github.com/repos/ansble/threepio/statuses/{sha}',
            subscribers_url:
              'https://api.github.com/repos/ansble/threepio/subscribers',
            subscription_url:
              'https://api.github.com/repos/ansble/threepio/subscription',
            svn_url: 'https://github.com/ansble/threepio',
            tags_url: 'https://api.github.com/repos/ansble/threepio/tags',
            teams_url: 'https://api.github.com/repos/ansble/threepio/teams',
            topics: [],
            trees_url:
              'https://api.github.com/repos/ansble/threepio/git/trees{/sha}',
            updated_at: '2022-06-06T20:22:19Z',
            url: 'https://api.github.com/repos/ansble/threepio',
            use_squash_pr_title_as_default: false,
            visibility: 'private',
            watchers: 0,
            watchers_count: 0,
          },
          sha: 'bc45ab468cf1e276b55fe30f20f04e7a6f49a4c1',
          user: {
            avatar_url: 'https://avatars.githubusercontent.com/u/85465133?v=4',
            events_url: 'https://api.github.com/users/ansble/events{/privacy}',
            followers_url: 'https://api.github.com/users/ansble/followers',
            following_url:
              'https://api.github.com/users/ansble/following{/other_user}',
            gists_url: 'https://api.github.com/users/ansble/gists{/gist_id}',
            gravatar_id: '',
            html_url: 'https://github.com/ansble',
            id: 85465133,
            login: 'ansble',
            node_id: 'MDEyOk9yZ2FuaXphdGlvbjg1NDY1MTMz',
            organizations_url: 'https://api.github.com/users/ansble/orgs',
            received_events_url:
              'https://api.github.com/users/ansble/received_events',
            repos_url: 'https://api.github.com/users/ansble/repos',
            site_admin: false,
            starred_url:
              'https://api.github.com/users/ansble/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/ansble/subscriptions',
            type: 'Organization',
            url: 'https://api.github.com/users/ansble',
          },
        },
        body: 'This heavily modifies what threepio does and moves it\r\nto a dev dependency.\r\n\r\n test plan:\n - a test plan \nJIRA: SOLFLOW-1215',
        changed_files: 3,
        closed_at: null,
        comments: 0,
        comments_url:
          'https://api.github.com/repos/ansble/threepio/issues/341/comments',
        commits: 1,
        commits_url:
          'https://api.github.com/repos/ansble/threepio/pulls/341/commits',
        created_at: '2022-06-09T15:12:06Z',
        deletions: 9,
        diff_url: 'https://github.com/ansble/threepio/pull/341.diff',
        draft: false,
        head: {
          label: 'ansble:debt/upgrade-threepio',
          ref: 'debt/upgrade-threepio',
          repo: {
            allow_auto_merge: false,
            allow_forking: false,
            allow_merge_commit: false,
            allow_rebase_merge: true,
            allow_squash_merge: true,
            allow_update_branch: true,
            archive_url:
              'https://api.github.com/repos/ansble/threepio/{archive_format}{/ref}',
            archived: false,
            assignees_url:
              'https://api.github.com/repos/ansble/threepio/assignees{/user}',
            blobs_url:
              'https://api.github.com/repos/ansble/threepio/git/blobs{/sha}',
            branches_url:
              'https://api.github.com/repos/ansble/threepio/branches{/branch}',
            clone_url: 'https://github.com/ansble/threepio.git',
            collaborators_url:
              'https://api.github.com/repos/ansble/threepio/collaborators{/collaborator}',
            comments_url:
              'https://api.github.com/repos/ansble/threepio/comments{/number}',
            commits_url:
              'https://api.github.com/repos/ansble/threepio/commits{/sha}',
            compare_url:
              'https://api.github.com/repos/ansble/threepio/compare/{base}...{head}',
            contents_url:
              'https://api.github.com/repos/ansble/threepio/contents/{+path}',
            contributors_url:
              'https://api.github.com/repos/ansble/threepio/contributors',
            created_at: '2021-11-22T16:41:27Z',
            default_branch: 'master',
            delete_branch_on_merge: true,
            deployments_url:
              'https://api.github.com/repos/ansble/threepio/deployments',
            description:
              'API built with Node.js used for the back-end of Solflow',
            disabled: false,
            downloads_url:
              'https://api.github.com/repos/ansble/threepio/downloads',
            events_url: 'https://api.github.com/repos/ansble/threepio/events',
            fork: false,
            forks: 0,
            forks_count: 0,
            forks_url: 'https://api.github.com/repos/ansble/threepio/forks',
            full_name: 'ansble/threepio',
            git_commits_url:
              'https://api.github.com/repos/ansble/threepio/git/commits{/sha}',
            git_refs_url:
              'https://api.github.com/repos/ansble/threepio/git/refs{/sha}',
            git_tags_url:
              'https://api.github.com/repos/ansble/threepio/git/tags{/sha}',
            git_url: 'git://github.com/ansble/threepio.git',
            has_downloads: true,
            has_issues: true,
            has_pages: false,
            has_projects: false,
            has_wiki: true,
            homepage: '',
            hooks_url: 'https://api.github.com/repos/ansble/threepio/hooks',
            html_url: 'https://github.com/ansble/threepio',
            id: 430787584,
            is_template: false,
            issue_comment_url:
              'https://api.github.com/repos/ansble/threepio/issues/comments{/number}',
            issue_events_url:
              'https://api.github.com/repos/ansble/threepio/issues/events{/number}',
            issues_url:
              'https://api.github.com/repos/ansble/threepio/issues{/number}',
            keys_url:
              'https://api.github.com/repos/ansble/threepio/keys{/key_id}',
            labels_url:
              'https://api.github.com/repos/ansble/threepio/labels{/name}',
            language: 'JavaScript',
            languages_url:
              'https://api.github.com/repos/ansble/threepio/languages',
            license: null,
            merges_url: 'https://api.github.com/repos/ansble/threepio/merges',
            milestones_url:
              'https://api.github.com/repos/ansble/threepio/milestones{/number}',
            mirror_url: null,
            name: 'threepio',
            node_id: 'R_kgDOGa1MAA',
            notifications_url:
              'https://api.github.com/repos/ansble/threepio/notifications{?since,all,participating}',
            open_issues: 12,
            open_issues_count: 12,
            owner: {
              avatar_url:
                'https://avatars.githubusercontent.com/u/85465133?v=4',
              events_url:
                'https://api.github.com/users/ansble/events{/privacy}',
              followers_url: 'https://api.github.com/users/ansble/followers',
              following_url:
                'https://api.github.com/users/ansble/following{/other_user}',
              gists_url: 'https://api.github.com/users/ansble/gists{/gist_id}',
              gravatar_id: '',
              html_url: 'https://github.com/ansble',
              id: 85465133,
              login: 'ansble',
              node_id: 'MDEyOk9yZ2FuaXphdGlvbjg1NDY1MTMz',
              organizations_url: 'https://api.github.com/users/ansble/orgs',
              received_events_url:
                'https://api.github.com/users/ansble/received_events',
              repos_url: 'https://api.github.com/users/ansble/repos',
              site_admin: false,
              starred_url:
                'https://api.github.com/users/ansble/starred{/owner}{/repo}',
              subscriptions_url:
                'https://api.github.com/users/ansble/subscriptions',
              type: 'Organization',
              url: 'https://api.github.com/users/ansble',
            },
            private: true,
            pulls_url:
              'https://api.github.com/repos/ansble/threepio/pulls{/number}',
            pushed_at: '2022-06-09T15:59:53Z',
            releases_url:
              'https://api.github.com/repos/ansble/threepio/releases{/id}',
            size: 2624,
            ssh_url: 'git@github.com:ansble/threepio.git',
            stargazers_count: 0,
            stargazers_url:
              'https://api.github.com/repos/ansble/threepio/stargazers',
            statuses_url:
              'https://api.github.com/repos/ansble/threepio/statuses/{sha}',
            subscribers_url:
              'https://api.github.com/repos/ansble/threepio/subscribers',
            subscription_url:
              'https://api.github.com/repos/ansble/threepio/subscription',
            svn_url: 'https://github.com/ansble/threepio',
            tags_url: 'https://api.github.com/repos/ansble/threepio/tags',
            teams_url: 'https://api.github.com/repos/ansble/threepio/teams',
            topics: [],
            trees_url:
              'https://api.github.com/repos/ansble/threepio/git/trees{/sha}',
            updated_at: '2022-06-06T20:22:19Z',
            url: 'https://api.github.com/repos/ansble/threepio',
            use_squash_pr_title_as_default: false,
            visibility: 'private',
            watchers: 0,
            watchers_count: 0,
          },
          sha: 'cd0e22269b2269bf9538db043de33f3faf9ae361',
          user: {
            avatar_url: 'https://avatars.githubusercontent.com/u/85465133?v=4',
            events_url: 'https://api.github.com/users/ansble/events{/privacy}',
            followers_url: 'https://api.github.com/users/ansble/followers',
            following_url:
              'https://api.github.com/users/ansble/following{/other_user}',
            gists_url: 'https://api.github.com/users/ansble/gists{/gist_id}',
            gravatar_id: '',
            html_url: 'https://github.com/ansble',
            id: 85465133,
            login: 'ansble',
            node_id: 'MDEyOk9yZ2FuaXphdGlvbjg1NDY1MTMz',
            organizations_url: 'https://api.github.com/users/ansble/orgs',
            received_events_url:
              'https://api.github.com/users/ansble/received_events',
            repos_url: 'https://api.github.com/users/ansble/repos',
            site_admin: false,
            starred_url:
              'https://api.github.com/users/ansble/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/ansble/subscriptions',
            type: 'Organization',
            url: 'https://api.github.com/users/ansble',
          },
        },
        html_url: 'https://github.com/ansble/threepio/pull/341',
        id: 963018598,
        issue_url: 'https://api.github.com/repos/ansble/threepio/issues/341',
        labels: [],
        locked: false,
        maintainer_can_modify: false,
        merge_commit_sha: 'ee8ac91cef946ea7b9315bde4f93e8cbb46a1842',
        mergeable: null,
        mergeable_state: 'unknown',
        merged: false,
        merged_at: null,
        merged_by: null,
        milestone: null,
        node_id: 'PR_kwDOGa1MAM45Zn9m',
        number: 341,
        patch_url: 'https://github.com/ansble/threepio/pull/341.patch',
        rebaseable: null,
        requested_reviewers: [],
        requested_teams: [
          {
            description: 'Working on sales tools',
            html_url: 'https://github.com/orgs/ansble/teams/solflow',
            id: 5859803,
            members_url:
              'https://api.github.com/organizations/85465133/team/5859803/members{/member}',
            name: 'solflow',
            node_id: 'T_kwDOBRgYLc4AWWnb',
            parent: null,
            permission: 'pull',
            privacy: 'closed',
            repositories_url:
              'https://api.github.com/organizations/85465133/team/5859803/repos',
            slug: 'solflow',
            url: 'https://api.github.com/organizations/85465133/team/5859803',
          },
        ],
        review_comment_url:
          'https://api.github.com/repos/ansble/threepio/pulls/comments{/number}',
        review_comments: 0,
        review_comments_url:
          'https://api.github.com/repos/ansble/threepio/pulls/341/comments',
        state: 'open',
        statuses_url:
          'https://api.github.com/repos/ansble/threepio/statuses/cd0e22269b2269bf9538db043de33f3faf9ae361',
        title: 'Upgrade to new version of Threepio',
        updated_at: '2022-06-09T15:59:52Z',
        url: 'https://api.github.com/repos/ansble/threepio/pulls/341',
        user: {
          avatar_url: 'https://avatars.githubusercontent.com/u/422540?v=4',
          events_url:
            'https://api.github.com/users/designfrontier/events{/privacy}',
          followers_url:
            'https://api.github.com/users/designfrontier/followers',
          following_url:
            'https://api.github.com/users/designfrontier/following{/other_user}',
          gists_url:
            'https://api.github.com/users/designfrontier/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/designfrontier',
          id: 422540,
          login: 'designfrontier',
          node_id: 'MDQ6VXNlcjQyMjU0MA==',
          organizations_url: 'https://api.github.com/users/designfrontier/orgs',
          received_events_url:
            'https://api.github.com/users/designfrontier/received_events',
          repos_url: 'https://api.github.com/users/designfrontier/repos',
          site_admin: false,
          starred_url:
            'https://api.github.com/users/designfrontier/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/designfrontier/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/designfrontier',
        },
      },
      repository: {
        allow_forking: false,
        archive_url:
          'https://api.github.com/repos/ansble/threepio/{archive_format}{/ref}',
        archived: false,
        assignees_url:
          'https://api.github.com/repos/ansble/threepio/assignees{/user}',
        blobs_url:
          'https://api.github.com/repos/ansble/threepio/git/blobs{/sha}',
        branches_url:
          'https://api.github.com/repos/ansble/threepio/branches{/branch}',
        clone_url: 'https://github.com/ansble/threepio.git',
        collaborators_url:
          'https://api.github.com/repos/ansble/threepio/collaborators{/collaborator}',
        comments_url:
          'https://api.github.com/repos/ansble/threepio/comments{/number}',
        commits_url:
          'https://api.github.com/repos/ansble/threepio/commits{/sha}',
        compare_url:
          'https://api.github.com/repos/ansble/threepio/compare/{base}...{head}',
        contents_url:
          'https://api.github.com/repos/ansble/threepio/contents/{+path}',
        contributors_url:
          'https://api.github.com/repos/ansble/threepio/contributors',
        created_at: '2021-11-22T16:41:27Z',
        default_branch: 'master',
        deployments_url:
          'https://api.github.com/repos/ansble/threepio/deployments',
        description: 'API built with Node.js used for the back-end of Solflow',
        disabled: false,
        downloads_url: 'https://api.github.com/repos/ansble/threepio/downloads',
        events_url: 'https://api.github.com/repos/ansble/threepio/events',
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: 'https://api.github.com/repos/ansble/threepio/forks',
        full_name: 'ansble/threepio',
        git_commits_url:
          'https://api.github.com/repos/ansble/threepio/git/commits{/sha}',
        git_refs_url:
          'https://api.github.com/repos/ansble/threepio/git/refs{/sha}',
        git_tags_url:
          'https://api.github.com/repos/ansble/threepio/git/tags{/sha}',
        git_url: 'git://github.com/ansble/threepio.git',
        has_downloads: true,
        has_issues: true,
        has_pages: false,
        has_projects: false,
        has_wiki: true,
        homepage: '',
        hooks_url: 'https://api.github.com/repos/ansble/threepio/hooks',
        html_url: 'https://github.com/ansble/threepio',
        id: 430787584,
        is_template: false,
        issue_comment_url:
          'https://api.github.com/repos/ansble/threepio/issues/comments{/number}',
        issue_events_url:
          'https://api.github.com/repos/ansble/threepio/issues/events{/number}',
        issues_url:
          'https://api.github.com/repos/ansble/threepio/issues{/number}',
        keys_url: 'https://api.github.com/repos/ansble/threepio/keys{/key_id}',
        labels_url:
          'https://api.github.com/repos/ansble/threepio/labels{/name}',
        language: 'JavaScript',
        languages_url: 'https://api.github.com/repos/ansble/threepio/languages',
        license: null,
        merges_url: 'https://api.github.com/repos/ansble/threepio/merges',
        milestones_url:
          'https://api.github.com/repos/ansble/threepio/milestones{/number}',
        mirror_url: null,
        name: 'threepio',
        node_id: 'R_kgDOGa1MAA',
        notifications_url:
          'https://api.github.com/repos/ansble/threepio/notifications{?since,all,participating}',
        open_issues: 12,
        open_issues_count: 12,
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/85465133?v=4',
          events_url: 'https://api.github.com/users/ansble/events{/privacy}',
          followers_url: 'https://api.github.com/users/ansble/followers',
          following_url:
            'https://api.github.com/users/ansble/following{/other_user}',
          gists_url: 'https://api.github.com/users/ansble/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/ansble',
          id: 85465133,
          login: 'ansble',
          node_id: 'MDEyOk9yZ2FuaXphdGlvbjg1NDY1MTMz',
          organizations_url: 'https://api.github.com/users/ansble/orgs',
          received_events_url:
            'https://api.github.com/users/ansble/received_events',
          repos_url: 'https://api.github.com/users/ansble/repos',
          site_admin: false,
          starred_url:
            'https://api.github.com/users/ansble/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/ansble/subscriptions',
          type: 'Organization',
          url: 'https://api.github.com/users/ansble',
        },
        private: true,
        pulls_url:
          'https://api.github.com/repos/ansble/threepio/pulls{/number}',
        pushed_at: '2022-06-09T15:59:53Z',
        releases_url:
          'https://api.github.com/repos/ansble/threepio/releases{/id}',
        size: 2624,
        ssh_url: 'git@github.com:ansble/threepio.git',
        stargazers_count: 0,
        stargazers_url:
          'https://api.github.com/repos/ansble/threepio/stargazers',
        statuses_url:
          'https://api.github.com/repos/ansble/threepio/statuses/{sha}',
        subscribers_url:
          'https://api.github.com/repos/ansble/threepio/subscribers',
        subscription_url:
          'https://api.github.com/repos/ansble/threepio/subscription',
        svn_url: 'https://github.com/ansble/threepio',
        tags_url: 'https://api.github.com/repos/ansble/threepio/tags',
        teams_url: 'https://api.github.com/repos/ansble/threepio/teams',
        topics: [],
        trees_url:
          'https://api.github.com/repos/ansble/threepio/git/trees{/sha}',
        updated_at: '2022-06-06T20:22:19Z',
        url: 'https://api.github.com/repos/ansble/threepio',
        visibility: 'private',
        watchers: 0,
        watchers_count: 0,
      },
      sender: {
        avatar_url: 'https://avatars.githubusercontent.com/u/422540?v=4',
        events_url:
          'https://api.github.com/users/designfrontier/events{/privacy}',
        followers_url: 'https://api.github.com/users/designfrontier/followers',
        following_url:
          'https://api.github.com/users/designfrontier/following{/other_user}',
        gists_url:
          'https://api.github.com/users/designfrontier/gists{/gist_id}',
        gravatar_id: '',
        html_url: 'https://github.com/designfrontier',
        id: 422540,
        login: 'designfrontier',
        node_id: 'MDQ6VXNlcjQyMjU0MA==',
        organizations_url: 'https://api.github.com/users/designfrontier/orgs',
        received_events_url:
          'https://api.github.com/users/designfrontier/received_events',
        repos_url: 'https://api.github.com/users/designfrontier/repos',
        site_admin: false,
        starred_url:
          'https://api.github.com/users/designfrontier/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/designfrontier/subscriptions',
        type: 'User',
        url: 'https://api.github.com/users/designfrontier',
      },
    },
    eventName: 'pull_request',
    sha: '1a0b94d19ff6a7686c01977c8968247ddb4e552a',
    ref: 'refs/pull/341/merge',
    workflow: 'Threepio Code Review Notes',
    action: '__actions_github-script',
    actor: 'designfrontier',
    job: 'comment',
    runNumber: 40,
    runId: 2469629571,
    apiUrl: 'https://api.github.com',
    serverUrl: 'https://github.com',
    graphqlUrl: 'https://api.github.com/graphql',
  }
}

export function generateStubContext(args?: any): Context {
  return {
    action: 'pull_request',
    number: 1,
    changes: {},
    pull_request: generateStubPullRequest(),
    repository: generateRepoStub(),

    ...args,
  }
}
