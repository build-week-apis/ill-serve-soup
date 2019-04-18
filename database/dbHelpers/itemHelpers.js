const db = require("../dbConfig");
const yup = require("yup");

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

//items that its require for database
let itemSchema = yup.object().shape({
  name: yup.string().required(),
  amount: yup
    .number()
    .required()
    .integer(),
  unit: yup.string().required()
});

module.exports = {
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  addItem,
  itemSchema
};
