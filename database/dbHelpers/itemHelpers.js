const db = require("../dbConfig");

async function getAllItems() {
  const allItems = await db("items");

  return allItems;
}

async function getItemById(id) {
  const item = await db("items")
    .where({ id })
    .first();

  return item;
}

module.exports = {
  getAllItems,
  getItemById
};
