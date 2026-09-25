CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    membership_status TEXT NOT NULL DEFAULT 'not member'
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE "user_session" (
  "sid" TEXT NOT NULL COLLATE "default",
  "sess" JSON NOT NULL,
  "expire" TIMESTAMP(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "user_session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "user_session" ("expire");