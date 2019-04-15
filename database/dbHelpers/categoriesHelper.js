const db = require("../dbConfig");

async function getAllCategories() {
  const categories = await db("categories").select("id", "name");

  // const items = await db("items").innerJoin(
  //   "categories",
  //   "items.categoryID",
  //   "items.id"
  // );

  return categories;
}

async function getCategoriesById(id) {
  const category = await db("categories")
    .where({ id })
    .first();
  const items = await db("items").where("categoryID", id);

  return {
    id: category.id,
    name: category.name,
    items: items
  };
}

module.exports = {
  getAllCategories,
  getCategoriesById
};
