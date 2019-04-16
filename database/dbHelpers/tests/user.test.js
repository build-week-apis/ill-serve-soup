const dbHelpers = require("../userHelpers");
const db = require("../../dbConfig");

describe("User endpoints testing", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  afterEach(async () => {
    await db("users").truncate();
  });

  it("should set testing enviroment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  it("shoud register/add a new user", async () => {
    await dbHelpers.registerUser({
      name: "Toby",
      password: 123,
      email: "toby@yahoo.com",
      role: "manager"
    });
    await dbHelpers.registerUser({
      name: "Maria",
      password: 123,
      email: "maria@yahoo.com",
      role: "manager"
    });
    const users = await db("users");
    expect(users).toHaveLength(2);
  });
});
