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

  it("shoud get a user by id", async () => {
    await dbHelpers.registerUser({
      name: "Toby",
      password: 123,
      email: "toby@yahoo.com",
      role: "manager"
    });
    const user = await dbHelpers.getUserById(1);
    expect(user).toBeDefined();
    expect(user).toEqual({
      email: "toby@yahoo.com",
      id: 1,
      name: "Toby",
      role: "manager"
    });
  });

  it("shoud update a user", async () => {
    await dbHelpers.registerUser({
      name: "Toby",
      password: 123,
      email: "toby@yahoo.com",
      role: "manager"
    });
    const result = await dbHelpers.updateUser(1, { name: "Teresa" });
    expect(result).toBe(1);
  });

  it("shoud delete a user", async () => {
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

    const result = await dbHelpers.deleteUser(1);
    expect(result).toBe(1);
  });
});
