const dbHelpers = require("../itemHelpers");
const db = require("../../dbConfig");

describe("User items function testing", () => {
  beforeAll(async () => {
    await db("items").truncate();

    await dbHelpers.addItem({
      id: 1,
      name: "Stone fruit",
      amount: 12,
      unit: "lbs",
      price: 6.3,
      supplier_name: "Est products",
      supplier_contact: "est@yahoo.com",
      image: "https://i.imgur.com/SCAVfIV.jpg",
      categoryID: 2
    });
    await dbHelpers.addItem({
      id: 2,
      name: "carrots",
      amount: 15,
      unit: "lbs",
      price: 2.3,
      supplier_name: "Nord products",
      supplier_contact: "nord@yahoo.com",
      image: "https://i.imgur.com/NdX1vFQ.jpg",
      categoryID: 1
    });
  });

  afterAll(async () => {
    await db("items").truncate();
  });

  it("should set testing enviroment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  it("shoud add a new item succesfully", async () => {
    const users = await db("items");
    expect(users).toHaveLength(2);
  });

  it("should get a item by id", async () => {
    const item = await dbHelpers.getItemById(1);
    expect(item).toBeDefined();
    expect(item).toHaveProperty("name", "Stone fruit");
  });

  it("should update a item", async () => {
    const count = await dbHelpers.updateItem(1, { name: "Test" });
    expect(count).toBe(1);

    const item = await dbHelpers.getItemById(1);
    expect(item).toHaveProperty("name", "Test");
  });
  it("shoud delete a item from database", async () => {
    const count = await dbHelpers.deleteItem(1);
    expect(count).toBe(1);
    const item = await dbHelpers.getItemById(1);
    expect(item).toBeUndefined();
    const itemDb = await db("items");
    expect(itemDb).toHaveLength(1);
  });
});
