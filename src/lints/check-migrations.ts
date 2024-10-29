import { LintError, LintErrorType, Context, File } from '../types'

export async function test(
  context: Context,
  level: LintErrorType
): Promise<LintError> {
  const { files } = context

  const migrationFiles = files.filter((file) =>
    file.filename.endsWith('migration.sql')
  )
  let message = ''

  const dropColumnRegex =
    /DROP COLUMN\s+"([a-zA-z_\-0-9]+)"(?!,\n?\+?\s?ADD COLUMN)/g
  const droppedColumns = []
  for (const migration of migrationFiles) {
    const matches = [...migration.patch.matchAll(dropColumnRegex)]
    const columns = matches.map((match) => match[1])

    droppedColumns.push(...columns)
  }

  if (droppedColumns.length > 0) {
    message += `⚠️ The following columns were dropped from the database: ${droppedColumns.join(
      ', '
    )}.

This has the potential of causing an outage during a deploy. Please ensure you take the following steps before merging this pull request:
1. Create a PR where you remove the column from the prisma.schema file. This pull request should not include the migration file. Be sure to remove all usages of the column in code.
2. Merge and deploy the above PR.
3. Merge and deploy this PR.

For more information about why this can cause an outage and more information on how to avoid it, please see: <https://lumiohx.atlassian.net/wiki/spaces/SE/pages/1105592325/Common+Prisma+Migration+Issues#Dropping-a-column>
`
  }

  // column data types can be changed in one of two ways. Either the data type is changed
  // or the column is dropped and a new one is added
  const changedTypeColumns = []
  const columnTypeChangedRegex = /ALTER COLUMN "(.*)" SET DATA TYPE (.*)/gi
  for (const migration of migrationFiles) {
    const matches = [...migration.patch.matchAll(columnTypeChangedRegex)]
    const columns = matches.map((match) => match[1])

    changedTypeColumns.push(...columns)
  }

  const columnDroppedAddedRegex =
    /DROP COLUMN\s+"([a-zA-Z_\-0-9]*)",\n?\+?\s?ADD COLUMN\s+"([a-zA-Z_\-0-9]*)"/gi
  for (const migration of migrationFiles) {
    const matches = [...migration.patch.matchAll(columnDroppedAddedRegex)]
    const columns = matches.map((match) => [match[1], match[2]])
    columns.forEach((columns) => {
      if (columns[0] === columns[1]) {
        changedTypeColumns.push(columns[0])
      }
    })
  }

  if (changedTypeColumns.length > 0) {
    message += `⚠️ The types of the following columns were changed: ${changedTypeColumns.join(
      ', '
    )}.

This has the potential of causing issues. To avoid this, please consider:
1. Add a new column with a new name and the data type you would like.
2. Create the migration using the Prisma CLI tool and then find the migration to add an additional line:
    - UPDATE your_table SET new_column_name = old_column_name;
    - This way the new column will have all of the old values. You may need to modify that statement in order to ensure that the difference in data types is properly handled.
3. Modify any code that is writing to the old column to also write to the new column.
4. Submit a PR, merge and deploy it.
5. Go through the Dropping a column section to remove the old column.

For more information about why this can cause an outage and more information on how to avoid it, please see: <https://lumiohx.atlassian.net/wiki/spaces/SE/pages/1105592325/Common+Prisma+Migration+Issues#Altering-a-column%E2%80%99s-type>`
  }

  const addedIndexes = []
  const addedIndexRegex =
    /CREATE INDEX(?!\s+CONCURRENTLY)\s+"([a-zA-Z0-9\-_]*)"/gi

  for (const migration of migrationFiles) {
    const matches = [...migration.patch.matchAll(addedIndexRegex)]
    console.log(matches)
    addedIndexes.push(...matches.map((match) => match[1]))
  }

  if (addedIndexes.length > 0) {
    message += `⚠️ The following indexes were not added with CONCURRENTLY: ${addedIndexes.join(
      ', '
    )}.
This can cause performance issues during the creation of the index. Please add the \`CONCURRENTLY\` statement in the migration file like:
\`\`\`
CREATE INDEX CONCURRENTLY "index_name" ...
\`\`\`

For more information about why this can cause performance issues and how to avoid it, please see: <https://lumiohx.atlassian.net/wiki/spaces/SE/pages/1105592325/Common+Prisma+Migration+Issues#Adding-an-index-to-a-column>
`
  }

  return message.length > 0
    ? {
        type: level,
        message,
      }
    : { type: 'none', message: '' }
}
