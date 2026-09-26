const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
require("dotenv").config();

const agent = request.agent(app);
const username = "test_join";

beforeAll(async () => {
  const hashedPassword = await bcrypt.hash("test1234", 10);

  await db.insertUser({
    firstName: "test",
    lastName: "join",
    username: username,
    password: hashedPassword,
  });

  await agent.post("/log-in").type("form").send({
    username: username,
    password: "test1234",
  });
});

describe("POST /join", () => {
  test("with wrong passcode responds with 200 and member status stays as 'not member'", async () => {
    const response = await agent
      .post("/join")
      .type("form")
      .send({ passcode: "wrong_passcode" });
    expect(response.status).toBe(200);

    const memberStatus = await db.checkIfUserIsMember(username);
    expect(memberStatus).toBe("not member");
  });

  test("with right passcode responds with 302 to / and sets member status to 'member' in database", async () => {
    const response = await agent
      .post("/join")
      .type("form")
      .send({ passcode: process.env.CLUB_PASSCODE });
    expect(response.status).toBe(302);
    expect(response.header.location).toBe("/");

    const memberStatus = await db.checkIfUserIsMember(username);
    expect(memberStatus).toBe("member");
  });
});

afterAll(async () => {
  await db.deleteUser(username);
});
