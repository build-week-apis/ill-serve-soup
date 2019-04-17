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

  it("should update a category succesfully", async () => {
    const result = await dbHelpers.updateCategory(2, { name: "maraciuca" });
    expect(result).toBe(1);

    const kitchen = await dbHelpers.getCategoriesById(2);
    expect(kitchen).toHaveProperty("name", "maraciuca");
  });

  it("should delete a category succesfully", async () => {
    const result = await dbHelpers.deleteCategory(1);
    expect(result).toBe(1);

    const categoryDB = await db("categories");
    expect(categoryDB).toHaveLength(3);
  });
});
