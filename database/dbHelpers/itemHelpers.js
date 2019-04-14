const db = require("../dbConfig");

async function getAllItems() {
  const allItems = await db("items");

  return allItems;
}

module.exports = {
  getAllItems
};
