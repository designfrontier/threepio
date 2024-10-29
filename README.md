# Threepio

I make code review easier for humans

## Documentation

You can find the documentation for all the checks [here](docs/rules.md)

## Usage

Add a github workflow and make sure that it looks similar to the one in this repo.

Here is an example that you can probably just drop in once you have installed the
threepio npm package in dev dependencies:

```
name: Threepio Code Review Notes
on:
  pull_request:
    types: [opened, synchronize, edited]

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 20.x
        uses: actions/setup-node@v2
        with:
          node-version: 20.x
      - run: npm i
      - uses: actions/github-script@v6
        with:
          script: |
            const threepio = require('threepio')
            const res = await threepio.review(context, github)

            if (!res) {
              process.exit(1)
            }
```

## Configuration

You can create a `.threepio` file in the root of a project using threepio to change the
configuration per project. The `.threepio` file is a yaml file as described below.
`warning` results in printing out the message in the comment but not in a failing
build. `error` does the same thing, but also causes the build step to fail.

```
tests:
  jiraTickets: warning
  testPlanCheck: error
  allFilesTested: error
  checkMigrations: warn
  changeSizeCheck: warning

jira:
  projects:
    - DOOM
    - PLAT

rules:
  allFilesTested:
    exclude:
      - src/types.ts
      - src/test-helpers/index.ts
```

The `rules` section allows config to be passed to specific tests. The example
above excludes certain files from the [allFilesTested](docs/rules.md#all-files-tested)
rule so that they won't show in the readout from it. For example there likely
won't be tests for the `src/types.ts` file because it just contains types, so
excluding it improves the signal to noise ratio of the comment.

## Creating a new lint

Run: `bin/new-lint`

That will create all the files that you need, plus modify the imports in most of
the places that you will need to import them to get them to work for you. All you
will need to do is update the documentation in `docs/rules.md`, the lint code,
its test file, and a couple of tests in other files that will start failing until
you update them to account for the new lint you wrote.
