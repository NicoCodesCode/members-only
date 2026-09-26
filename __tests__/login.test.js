const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const pool = require("../db/pool");

beforeAll(async () => {
  const hashedPassword = await bcrypt.hash("test1234", 10);
  await db.insertUser({
    firstName: "test",
    lastName: "login",
    username: "test_login",
    password: hashedPassword,
  });
});

describe("POST /log-in", () => {
  test("responds with 302 to /", async () => {
    const response = await request(app).post("/log-in").type("form").send({
      username: "test_login",
      password: "test1234",
    });
    expect(response.status).toBe(302);
    expect(response.header.location).toBe("/");
  });
  test("with wrong password responds with 302 to /log-in", async () => {
    const response = await request(app).post("/log-in").type("form").send({
      username: "test_login",
      password: "wrong_password",
    });
    expect(response.status).toBe(302);
    expect(response.header.location).toBe("/log-in");
  });
});

afterAll(async () => {
  await pool.query("DELETE FROM users WHERE username = $1", ["test_login"]);
});
