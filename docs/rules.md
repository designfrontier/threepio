# Threepio Rules

There are two levels of rules, warnings, and errors. An error results
in a non-zero exit code, while a warning exits normally. Both provide
some guidance for the reviewer and the author.

### jira ticket

id: `jiraTickets`
default level: `error`

Jira ticket IDs are required to be in the body of a pull request.
This is so that the deploy and JIRA work together correctly.

It looks like:

```
Errors That Need Correction Before Merging
- No JIRA ticket found in PR body
```

You can correct this error by adding the JIRA ticket id to the pull request
body. Generally the preferred method is at the bottom of the PR like this:
`JIRA: [PLAT-1234]`. But the presence is all that is required to pass.
Surrounding it in square brackets creates a hyperlink to the JIRA ticket.

Currently supported JIRA projects are:

- PLAT

To add more you can specify them in the rules section of the `.threepio` file like this:

```
rules:
  jiraTickets:
      prefix:
        - fake
```

### test plan in body

id: `testPlanCheck`
default level: `error`

Test plans are required in the body of a pull request. The idea is to
provide steps that a code reviewer can use locally to validate the
change. It is useful to include any setup steps that are needed to
validate things, for instance if a project needs to be in a specific
state for validation, it would be useful to provide steps to get the
project into that state.

It looks like:

```
Errors That Need Correction Before Merging

- No Test Plan found in PR body
```

You can correct this error with a test plan that looks like this:

```
Test Plan:
- step 1
- step 2
- step n
```

It must have at least one step after the `Test Plan:` line in order
to pass the check.

### all files tested

id: `allFilesTested`
default level: `warning`

All files tested provides a list of files (`.js`, '.ts', or the jsx
version of each) that were modified without their corresponding unit
tests being modified at the same time.

The list is output in the comments left by Threepio on the PR.

It looks like:

```
Things That Need Reviewer Attention

No tests found for these files
-- src/test-helpers/index.ts
```

You can correct this by ensuring that all changes are properly
tested.

### change size

id: `changeSizeCheck`
default level: `warning`

Change Size is a warning around the scope of a change. It ignores a
few files (package-lock.json for instance) that are generated and can
have large changes with minimal risk.

This is a reminder to break PRs up when possible into smaller
changes.

### check-migrations

id: `checkMigrations`
default level: `warn`

Checks to make sure that you aren't making any changes to the database schema
that might result in unexpected failures. More information about common
migration problems can be found [here](./database.md).

You can change the files that are matched in one of two ways:

1. by configuring the ending string you want it to look for
2. by changing the directory you want it to look in

For example:

```
rules:
  checkMigrations:
      ending: '.sql'
```

will match all files that end in `.sql` that are part of the PR.
That may be what you want, but it also might not. The default
ending it matches on is `migration.sql`.

The example for number 2 look like this:

```
rules:
  checkMigrations:
      dir: 'db/migrations'
```

This will match any file in `db/migrations` and run the check against them.
You could also use both like this:

```
rules:
  checkMigrations:
      dir: 'db/migrations'
      ending: '.sql'
```

The result here is that any file in `db/migrations` that ends in
`.sql` will be matched and other files in that directory will be
ignored.

You MUST specify both if you want both behaviors. Specifying `dir`
without `ending` will result in ending being ignored.
