const dbHelpers = require("../itemHelpers");
const db = require("../../dbConfig");

describe("User items function testing", () => {
  beforeEach(async () => {
    await db("items").truncate();
  });

  it("should set testing enviroment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  it("shoud add a new item succesfully", async () => {
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
    const users = await db("items");
    expect(users).toHaveLength(2);
  });
});
