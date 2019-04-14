const db = require("../dbConfig");

async function getALlItems() {
  const getAllItems = await db("items");

  return allItems;
}

module.exports = {
  getAllItems
};
