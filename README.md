# Hippieløp

Bingo board for [Abakus](https://abakus.no)' hippieløp during fadderuka.
Groups log in with a 6-character code, get a board of tasks, and mark them as started or submitted.
An admin approves submissions, and the scoreboard updates as they come in.

## Stack

- **Next.js 15** (App Router) + React 18 + TypeScript
- **Prisma** on **Postgres** (Neon, provisioned through the Vercel Marketplace)
- **NextAuth v5** with a credentials provider: the group code _is_ the login, JWT sessions
- **Tailwind** + shadcn/ui + Radix
- **SWR** polls `/api/tasks` to pick up other groups' progress

There is no separate backend.
Pages read from the database in server components, and mutations go through server actions in `src/actions/`.

## Getting started

```bash
yarn install
vercel link                  # abakus-ntnu/hippielop
vercel env pull .env.local
yarn dev
```

The schema has no migrations, so push it directly:

```bash
npx prisma db push
npx prisma db seed           # 50 tasks + fadder groups with random codes
```

The seed does not create an admin group.
Set `isAdmin = true` on one group manually to reach `/admin`.
Re-running the seed duplicates rows rather than resetting them.

## Data model

Three tables in `prisma/schema.prisma`.
`Task` (a task with a page and a point value), `Group` (a fadder group with a login code), and `GroupTask` joining them with a status of `notStarted`, `started`, `sent`, or `completed`.

## Deploying

Runs on **Vercel** (`abakus-ntnu/hippielop`) with Neon Postgres.
`hippielop.abakus.no` points there via a CNAME in the [dns](https://github.com/webkom/dns) repo.

```bash
vercel deploy                # preview
vercel deploy --prod
```

Deploys have to go through the CLI.
The Vercel account is on the Hobby plan, which cannot connect projects to git repositories owned by an organisation, so there is no deploy on push.

Environment variables live in Vercel and are fetched with `vercel env pull`.
The ones that matter are `POSTGRES_PRISMA_URL` (from Neon), `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`.

## Event timing

Open and close times live in `src/shared/config.ts` and are given in UTC.
Norwegian summer time is UTC+2, so `16:00Z` means 18:00 locally.

The values are baked into the build, so changing them needs a new deploy.
Before the board opens, both the pages and `/api/tasks` return an empty list so nobody can read the tasks early.
