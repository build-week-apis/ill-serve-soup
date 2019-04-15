const db = require("../dbConfig");

async function getAllCategories(id) {
  // const categories = await db("categories");
  // const items = await db("items").innerJoin(
  //   "categories",
  //   "=",
  //   "items.categoryID",
  //   "items.id"
  // );

  // return { categories, items };

  const categories = db("categories").select("id", "name");
  const category = db("categories")
    .select("id", "name")
    .where({ id })
    .first();
  const items = db("items")
    .select("id", "name", "amount", "unit", "image", "categoryID")
    .where("categoryID", id);

  if (id) {
    return Promise.all([category, items]).then(response => {
      let [category, items] = response;
      let result = { id: category.id, name: category.name, items: items };
      return result;
    });
  }
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
