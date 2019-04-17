const dbHelpers = require("../categoriesHelper");
const db = require("../../dbConfig");

describe("Unit tests for Categoris helpers", () => {
  beforeAll(async () => {
    await dbHelpers.addCategory({
      id: 1,
      name: "chicken"
    });
    await dbHelpers.addCategory({
      id: 2,
      name: "fruits"
    });
    await dbHelpers.addCategory({
      id: 3,
      name: "herbal"
    });
  });

  afterAll(async () => {
    await db("categories").truncate();
  });

  it("should add a category succesfully", async () => {
    await dbHelpers.addCategory({ id: 4, name: "test" });
    const cat = await db("categories");
    expect(cat).toHaveLength(4);
  });
});
