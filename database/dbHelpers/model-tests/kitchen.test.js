const dbHelpers = require("../kitchenHelpers");
const db = require("../../dbConfig");

describe("User helper function testing", () => {
  beforeAll(async () => {
    await dbHelpers.addKitchen({
      id: 1,
      name: "The Soup Kitchen",
      location: "123 Smith Street, Brunswick, VIC, 3056",
      mission:
        "Established in 1983, The Soup Kitchen Inc. is a 501 (c)(3) non-profit organization whose goal is to help the less fortunate members of our community.  This includes the elderly, unemployed, underemployed, poor, migrants and homeless – women, men and children",
      average_visitors: 2.4,
      website: "www.thesoupkitchen.com"
    });
    await dbHelpers.addKitchen({
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

  it("shoud add a new kitchen", async () => {
    const users = await db("kitchens");
    expect(users).toHaveLength(2);
  });

});
