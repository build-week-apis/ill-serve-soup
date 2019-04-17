const request = require("supertest");
const server = require("../../api/server");
const db = require("../../database/dbConfig");
const restricted = require("../../middleware/tokenRestricted");
const itemHelpers = require("../../database/dbHelpers/itemHelpers");

describe("Request: /api/items TESTS", () => {
  beforeAll(async () => {
    await db("items").truncate();
    await itemHelpers.addItem({
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

    await itemHelpers.addItem({
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

  it("Request: GET /api/items", async () => {
    const newItem = {
      name: "Testtt fruit",
      amount: 121,
      unit: "kg",
      price: 6.32,
      supplier_name: "Est products",
      supplier_contact: "est@yahoo.com",
      image: "https://i.imgur.com/SCAVfIV.jpg",
      categoryID: 2
    };

    const result = await request(server)
      .get("/api/items")
      .set({ Authorization: "223" })
      .send(newItem)
      .expect(401);

    expect(result.body).toBeDefined();
  });
});
