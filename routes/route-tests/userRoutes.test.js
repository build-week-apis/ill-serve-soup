const request = require("supertest");
const server = require("../../api/server");
const db = require("../../database/dbConfig");
const restricted = require("../../middleware/tokenRestricted");
const userHelpers = require("../../database/dbHelpers/userHelpers");

describe("Endpoint: /api/users/register && login TESTS", () => {
  beforeAll(async () => {
    await db("users").truncate();
    await userHelpers.registerUser({
      name: "Babacu",
      password: 123,
      email: "babacu@yahoo.com",
      role: "manager"
    });

    await userHelpers.registerUser({
      name: "Tudor",
      password: 123,
      email: "tudor@yahoo.com",
      role: "manager"
    });
  });

  afterAll(async () => {
    await db("users").truncate();
  });

  it("should set testing enviroment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  it("Request: GET /api/users/register", async () => {
    const user = {
      name: "Bean",
      password: "123",
      email: "bean@yahoo.com",
      role: "manager"
    };

    const res = await request(server)
      .post("/api/users/register")
      .send(user);
    expect(res.body).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("email", "bean@yahoo.com");
    expect(res.body).toHaveProperty("message");
  });

  it("Request: GET /api/users/login", async () => {
    const user = {
      name: "Bean",
      password: "123"
    };
    const res = await request(server)
      .post("/api/users/login")
      .send(user);
    expect(res.body).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("role", "manager");
  });

  it("sould register with corrent email : status 400", async () => {
    const newUser = {
      name: "Bean",
      password: "123",
      email: "beanyahoo.com",
      role: "manager"
    };

    const res = await request(server)
      .post("/api/users/register")
      .send(newUser);
    expect(res.status).toBe(400);
  });

  it("shoud return 401 id body is not correct", async () => {
    const newUser1 = {
      na: "Pop",
      password: "123",
      email: "pop@yahoo.com",
      role: "manager"
    };
    const res = await request(server)
      .post("/api/users/register")
      .send(newUser1);
    expect(res.status).toBe(401);
  });

  it("shoud return 500 if the user is not unique ", async () => {
    const user2 = {
      name: "Babacu",
      password: 123,
      email: "babacu@yahoo.com",
      role: "manager"
    };
    const res = await request(server)
      .post("/api/users/register")
      .send(user2);
    expect(res.status).toBe(500);
  });
});
