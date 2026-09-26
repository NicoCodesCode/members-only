# Members Only

A message board with membership gating: anyone can sign up and post, but only members can see who wrote a message and when. Membership is unlocked by entering a passcode.

## Quick Start

Requires Docker and Docker Compose. No local Node or Postgres installation needed as everything runs in containers.

```bash
git clone <repo-url>
cd members-only
```

Copy `.env.example` into an actual `.env` file, open it and fill in real values (any local values work since none of these are shared with anything external). `CLUB_PASSCODE` is the passcode you'll use to unlock membership once the app is running, so pick something you'll remember.

```bash
docker compose up --build
```

The database schema is applied automatically the first time Postgres starts. The app is available at `http://localhost:3000`.

To see the full flow: sign up for an account, post a message, then visit `/join` and enter the `CLUB_PASSCODE` value you set in `.env`. Messages will now show their author and post date.

## Tech Stack

- **Runtime**: Node.js, Express
- **Database**: PostgreSQL, raw SQL via the `pg` driver
- **Auth**: Passport (local strategy) + bcrypt, with sessions persisted in Postgres via `connect-pg-simple`
- **Views**: EJS
- **Testing**: Jest + Supertest
- **Containerization**: Docker, Docker Compose

## Key Features

- Full auth flow: signup, login, logout, with hashed passwords and Postgres-backed sessions
- Route-level auth protection on message-posting and membership routes
- Passcode-gated membership status, stored per user
- Conditional rendering: message author/date only visible to members
- Fully containerized local environment
- Automated tests

## Architecture

Two containers, one data store. The Express app handles routing, auth, and validation, and talks to a single Postgres instance for everything it needs to persist: user accounts, session data, and messages. Sessions are stored in Postgres itself (via `connect-pg-simple`) rather than in memory, so a user stays logged in across app restarts, not just within a single running process.

The two containers communicate over Docker Compose's internal network, with the app addressing Postgres by its service name (`db`) rather than `localhost`.

## Why raw SQL instead of an ORM

This project uses the `pg` driver directly, with hand-written SQL in `db/queries.js` and a plain `db/schema.sql` defining every table. ORMs like Prisma are genuinely useful, but they also abstract away a layer that's worth being able to work in directly: knowing how to write a `JOIN`, define a foreign key constraint, or reason about exactly what query is hitting the database is a different (and complementary) skill from generating that SQL through a client library.

`db/schema.sql` is the single source of truth for the database's structure, including `users`, `messages`, and the `user_session` table required by `connect-pg-simple` for session storage. The same file is applied automatically to both the main database and the isolated test database on first startup, so there's no drift between what the app expects and what the tests run against.

## Testing

```bash
npm test
```

Tests run against a separate `members_only_test` database, created and schema-applied automatically the first time the Postgres container initializes (see `db/init-test-db.sh`), so they never touch the main database. Test credentials are swapped in before any test file loads (`jest.setup.js`), and the connection pool is explicitly closed after the full run (`jest.teardown.js`).

Some cleanup (closing the `pg` pool) finishes slightly after Jest's default 1-second check. `openHandlesTimeout` is set higher in `jest.config.js` to account for this, rather than force-exiting the process.

## Environment Variables

See `.env.example` for the full list of variables the app expects, with placeholder values and guidance for each.
