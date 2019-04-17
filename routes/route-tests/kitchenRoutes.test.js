const request = require("supertest");
const server = require("../../api/server");
const db = require("../../database/dbConfig");
const itemHelpers = require("../../database/dbHelpers/kitchenHelpers");

describe("Request: /api/kitchens TESTS", () => {
  beforeAll(async () => {
    await db("kitchens").truncate();
    await itemHelpers.addKitchen({
      id: 1,
      name: "The Soup Kitchen",
      location: "123 Smith Street, Brunswick, VIC, 3056",
      mission:
        "Established in 1983, The Soup Kitchen Inc. is a 501 (c)(3) non-profit organization whose goal is to help the less fortunate members of our community.  This includes the elderly, unemployed, underemployed, poor, migrants and homeless – women, men and children",
      average_visitors: 2.4,
      website: "www.thesoupkitchen.com"
    });

    await itemHelpers.addKitchen({
      id: 2,
      name: "The Soup Compasion",
      location: "Via Garibaldi 123, 00100 Roma\t",
      mission:
        "All of the Compassion Soup Kitchen’s mahi is guided by our vision, mission and values. We strive to ensure our service best fits the needs of people in our community, and honour our mission. We evaluate new and existing services against our vision and mission, and use our values to carry out this work",
      average_visitors: 6.4,
      website: "www.thesoupcompasion.com"
    });
  });

  afterAll(async () => {
    await db("kitchens").truncate();
  });

  it("should set testing enviroment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  it("Request: GET /api/kitchens shold reuturn 200", async () => {
    const result = await request(server)
      .get("/api/kitchens")
      .expect(200);

    expect(result.body).toBeDefined();
  });

  it("shoud return an array", async () => {
    const result = await request(server).get("/api/kitchens");
    expect(Array.isArray(result.body)).toBeTruthy();
  });

  it("shoud return an object", async () => {
    const result = await request(server).get("/api/kitchens/1");
    expect(typeof result.body).toBe("object");
  });

  it("shoud return 404 if id is not fund", async () => {
    const result = await request(server).get("/api/kitchens/122");
    expect(result.status).toBe(404);
  });

  it("should return new soup kitchen succesfully", async () => {
    const newKitchen = await request(server)
      .post("/api/kitchens")
      .send({
        id: 3,
        name: "Treton Soup Kitchen",
        location: "Javorová 33/A, 123 45 Bratislava 2\t",
        mission:
          "With a strong infrastructure managed by a committed and engaged Board and staff, TASK will expand its ability to reach the hungry in the Trenton area and those with the aspiration or responsibility to serve them.",
        average_visitors: 8.6,
        website: "www.tretonkitchen.com"
      });
    const kitchenDb = await db("kitchens");
    expect(kitchenDb).toHaveLength(3);
  });

  it("shoud update a kitchen succesfully", async () => {
    const result = await request(server)
      .put("/api/kitchens/2")
      .send({ location: "test location" });
    expect(result.status).toBe(200);
  });
});
