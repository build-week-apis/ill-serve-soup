const db = require("../dbConfig");

async function getAllCategories() {
  const categories = await db("categories");

  return categories;
}

async function getCategoriesById(catID) {
  const category = await db("categories").where({ id: catID });
  const items = await db("items").where("categoryID", "=", "catID");

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
