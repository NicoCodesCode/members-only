const request = require("supertest");
const app = require("../app");
const pool = require("../db/pool");

describe("POST /sign-up", () => {
  test("responds with 302 to /log-in", async () => {
    const response = await request(app).post("/sign-up").type("form").send({
      firstName: "test",
      lastName: "signup",
      username: "test_signup",
      password: "test1234",
      confirmPassword: "test1234",
    });
    expect(response.status).toBe(302);
    expect(response.header.location).toBe("/log-in");
  });

  test("with unmatched passwords responds with 200 and says 'Passwords don't match'", async () => {
    const response = await request(app).post("/sign-up").type("form").send({
      firstName: "test",
      lastName: "signup",
      username: "test_signup",
      password: "test1234",
      confirmPassword: "test5678",
    });
    expect(response.status).toBe(200);
    expect(response.text).toContain("Passwords don&#39;t match");
  });
});

afterEach(async () => {
  await pool.query("DELETE FROM users WHERE username = $1", ["test_signup"]);
});
