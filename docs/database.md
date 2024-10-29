This document describes some of the more common issues that might arise from
performing database migrations.

## Dropping a column

When you remove a column from the `prisma.schema` file and run
`prisma migrate dev`, a new migration file will be created which will have some
`ALTER TABLE ... DROP COLUMN ...` lines.

As part of our deploys, we run migrations before we deploy the new version of
code. As a result there will be a window after migrations have been run in the
deployed database and before the new code has been deployed, where an outage
can occur.

When you perform a `prisma.someTable.findFirst`, under the hood, Prisma will
generate a SQL statement that explicitly asks for specific columns from the
table as opposed to doing a `SELECT \*`. So the underlying SQL statement might
look like `SELECT some_table.column_one, some_table.column_two ....` Which
columns are selected is based on the `prisma.schema` that was in place when
the prisma client was generated.

When you run a deploy, the migrations will run, dropping the column, but the
old code will still be deployed for a time. So until the new code is deployed,
the old prisma client will still be asking for the dropped column and will
throw an error.

To avoid these kinds of problems you will need to take the following steps:

1. Create a PR that removes the column from the prisma schema, but does not
   include the migration file. We want the prisma client in the deployed
   environment to not be asking the database for the column before we actually
   drop the column. In addition as part of this PR, you’ll want to remove all
   instances where that column is being used in code.
2. Merge and deploy that change to all deployed environments.
3. Create a PR with only the migration file.
4. Merge and deploy that migration.

## Altering a column’s type

In some circumstances, when you change the type of a column, Prisma will drop
the old column and create a new column with the new data type. This can be
dangerous because it can result in a loss of data.

In other circumstances, Prisma will perform an `ALTER COLUMN ... SET DATA TYPE`.
While generally this is safer, it can still result in outages.

In both cases, if the old code that is currently deployed is depending on the
data to be a certain data type, the code will stop working.

In addition, if you are using [AWS DMS](https://aws.amazon.com/dms/) to
replicate the database into Redshift: This tool uses a replication slot to
stream all data changes to Redshift. But when the data type of a column changes,
it can cause DMS to fail because it was expecting data to be the old type and
it has changed.

To avoid these kinds of errors you will want to take a multi step approach:

1. Add a new column with a new name and the data type you would like.
2. Create the migration using the Prisma CLI tool and then find the migration
   to add an additional line:
   1. `UPDATE your_table SET new_column_name = old_column_name;`
   2. This way the new column will have all of the old values. You may need to
      modify that statement in order to ensure that the difference in data types
      is properly handled.
3. Modify any code that is writing to the old column to also write to the new column.
4. Submit a PR, merge and deploy it.
5. Go through the Dropping a column section to remove the old column.

## Renaming a column

When you try to rename a column in a prisma.schema file, what Prisma will
actually do is drop the original column and then create a new column. This
exhibits both issues with the above section on dropping a column, and could
result in data loss.

In order to prevent this from happening you will want to take the following
actions:

1. Add a new column with the name you would like to use.
2. Create the migration using the Prisma CLI tool and then find the migration
   to add an additional line:
   1. `UPDATE your_table SET new_column_name = old_column_name;`
   2. This way the new column will have all of the old values. You may need to modify that statement in order to ensure that the difference in data types is properly handled.
3. Modify any code that is writing to the old column to also write to the new column.
4. Submit a PR, merge and deploy it.
5. Go through the Dropping a column section to remove the old column.

## Adding an index to a column

Sometimes adding indexes, especially on large tables can consumer a lot of
compute and thus degrade performance. The problem can be furthered on certain
Postgres versions. It’s important to consider the impact that creating the
index will have.

One thing you can do after adding an index would be to modify the migration
file to ensure that it has the `CONCURRENTLY` statement in the `CREATE`.
That can look like this:

`CREATE INDEX CONCURRENTLY`
