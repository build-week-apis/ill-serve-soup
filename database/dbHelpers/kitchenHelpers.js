const db = require("../dbConfig");

async function getAllSoupKitchen() {
  const allKitchens = await db("kitchens");

  return allKitchens;
}

module.exports = {
  getAllSoupKitchen
};
