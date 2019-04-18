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

async function addItem(itm) {
  const [ids] = await db("items")
    .insert(itm)
    .returning("id");
  const item = getItemById(ids);
  return item;
}

async function updateItem(id, item) {
  const result = await db("items")
    .where({ id })
    .update(item);

  return result;
}

async function deleteItem(id) {
  const result = await db("items")
    .where({ id })
    .del();

  return result;
}

module.exports = {
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  addItem
};
