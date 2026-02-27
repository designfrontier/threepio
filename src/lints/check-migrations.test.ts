import { test as checkMigrations } from './check-migrations'
import { generateStubContext, generateStubPullRequest } from '../test-helpers'

describe('#checkMigrations', () => {
  test('returns an error when a column is dropped', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test string with no JIRA id in it',
      }),
      files: [
        {
          sha: '5c9ae0a113f763f2628ee5426fd372a5aade13ac',
          filename: 'database/migrations/migration-folder/migration.sql',
          status: 'added',
          additions: 10,
          deletions: 0,
          changes: 10,
          blob_url: '',
          raw_url: '',
          contents_url: '',
          patch:
            '@@ -0,0 +1,10 @@\n+/*\n+  Warnings:\n+\n+  - You are about to drop the column `birthdate` on the `recruits` table. All the data in the column will be lost.\n+  - You are about to drop the column `ssn_last_4` on the `recruits` table. All the data in the column will be lost.\n+\n+*/\n+-- AlterTable\n+ALTER TABLE "recruits" DROP COLUMN "birthdate",\n+DROP COLUMN "ssn_last_4";',
        },
      ],
    })

    const { type, message } = await checkMigrations(fakeContext, 'error', {})

    expect(type).toBe('error')
    expect(message).toContain('dropped')
    expect(message).toContain('birthdate')
    expect(message).not.toContain('types')
  })

  test('returns an error when a column data type is changed via column drop and readd', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test string with no JIRA id in it',
      }),
      files: [
        {
          sha: 'c6ac515d609970d040435900ff06e79999995f2a',
          filename: 'database/migrations/migration-folder/migration.sql',
          status: 'added',
          additions: 9,
          deletions: 0,
          changes: 9,
          blob_url: '',
          raw_url: '',
          contents_url: '',
          patch:
            '@@ -0,0 +1,32 @@\n+/*\n+  Warnings:\n+\n+  - You are about to drop the column `assigned_to` on the `cases` table. All the data in the column will be lost.\n+  - A unique constraint covering the columns `[foreign_case_id]` on the table `cases` will be added. If there are existing duplicate values, this will fail.\n+  - Added the required column `case_number` to the `cases` table without a default value. This is not possible if the table is not empty.\n+  - Added the required column `foreign_case_id` to the `cases` table without a default value. This is not possible if the table is not empty.\n+  - Changed the type of `department` on the `cases` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.\n+\n+*/\n+-- CreateEnum\n+CREATE TYPE "CaseNoteOrigin" AS ENUM (\'system\', \'user\');\n+\n+-- DropForeignKey\n+ALTER TABLE "cases" DROP CONSTRAINT "cases_assigned_to_fkey";\n+\n+-- AlterTable\n+ALTER TABLE "case_notes" ADD COLUMN     "origin" "CaseNoteOrigin" NOT NULL DEFAULT \'user\',\n+ADD COLUMN     "synced" BOOLEAN NOT NULL DEFAULT false;\n+\n+-- AlterTable\n+ALTER TABLE "cases" DROP COLUMN "assigned_to",\n+ADD COLUMN     "case_number" TEXT NOT NULL,\n+ADD COLUMN     "foreign_case_id" VARCHAR(255) NOT NULL,\n+DROP COLUMN "department",\n+ADD COLUMN     "department" TEXT NOT NULL;\n+\n+-- DropEnum\n+DROP TYPE "CaseDepartment";\n+\n+-- CreateIndex\n+CREATE UNIQUE INDEX "cases_foreign_case_id_key" ON "cases"("foreign_case_id");',
        },
      ],
    })

    const { type, message } = await checkMigrations(fakeContext, 'error', {})

    expect(type).toBe('error')
    expect(message).toContain('types')
    expect(message).toContain('department')
    expect(message).not.toContain('dropped')
  })

  test('returns an error when a column data type is changed via set data type', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test string with no JIRA id in it',
      }),
      files: [
        {
          sha: 'c6ac515d609970d040435900ff06e79999995f2a',
          filename: 'database/migrations/migration-folder/migration.sql',
          status: 'added',
          additions: 9,
          deletions: 0,
          changes: 9,
          blob_url: '',
          raw_url: '',
          contents_url: '',
          patch:
            '@@ -0,0 +1,2 @@\n+-- AlterTable\n+ALTER TABLE "recruits" ALTER COLUMN "workday_prehire_id" SET DATA TYPE TEXT;',
        },
      ],
    })

    const { type, message } = await checkMigrations(fakeContext, 'error', {})

    expect(type).toBe('error')
    expect(message).toContain('types')
    expect(message).toContain('workday_prehire_id')
    expect(message).not.toContain('dropped')
  })

  test('returns an error when an index is added without CONCURRENTLY', async () => {
    const fakeContext = generateStubContext({
      pull_request: generateStubPullRequest({
        body: 'this is a test string with no JIRA id in it',
      }),
      files: [
        {
          sha: 'c6ac515d609970d040435900ff06e79999995f2a',
          filename: 'database/migrations/migration-folder/migration.sql',
          status: 'added',
          additions: 9,
          deletions: 0,
          changes: 9,
          blob_url: '',
          raw_url: '',
          contents_url: '',
          patch:
            '@@ -0,0 +1,2 @@\n+-- CreateIndex\n+CREATE INDEX "projects_public_id_idx" ON "projects"("public_id");',
        },
      ],
    })

    const { type, message } = await checkMigrations(fakeContext, 'error', {})

    expect(type).toBe('error')
    expect(message).toContain('CONCURRENTLY')
    expect(message).toContain('projects_public_id_idx')
  })
})
