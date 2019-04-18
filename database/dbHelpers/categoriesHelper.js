const db = require("../dbConfig");
const yup = require("yup");

async function getAllCategories() {
  const categories = await db("categories").select("id", "name"); //Im not sure how to get it

  // const items = await db("items").innerJoin(
  //   "categories",
  //   "items.categoryID",
  //   "items.id"
  // );

  //Trying to get a response like - Unsuccesfully for now
  /**
}

categories: [
    {
        id: 1,
        name: 'fruits',
        items: [
            {id: 1, name: 'strawberries', amount: 1, unit: 'lb', imageURL: 'https://i.imgur.com/ABD0qFP.jpg', categoryID: 1},
            {id: 2, name: 'blueberries', amount: 20, unit: 'oz', imageURL: 'https://i.imgur.com/RDF12Hd.jpg', categoryID: 1},
        ]
    }
    {
        id: 2,
        name: 'vegetables',
        items: [
            {id: 3, name: 'carrots', amount: 1.5, unit: 'lbs', imageURL: 'https://i.imgur.com/RTZ0qFP.jpg', categoryID: 2},
            {id: 4, name: 'broccoli', amount: 1, unit: 'lb', imageURL: 'https://i.imgur.com/47fHnED.jpg', categoryID: 2}
        ]
    }
],

"decodedToken": {
    "email": "faked@abc.com",
    "role": "admin",
    "iat": 1549409409,
    "exp": 1549413009,
    "jti": "12345"
}
}
   */ return categories;
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

async function addCategory(category) {
  const [id] = await db("categories")
    .insert(category)
    .returning("id");
  const newCategory = getCategoriesById(id);

  return newCategory;
}

async function updateCategory(id, category) {
  const result = await db("categories")
    .where({ id })
    .update(category);

  return result;
}

async function deleteCategory(id) {
  const result = await db("categories")
    .where({ id })
    .del();

  return result;
}

let categorySchema = yup.object().shape({
  name: yup.string().required()
});

module.exports = {
  getAllCategories,
  getCategoriesById,
  addCategory,
  updateCategory,
  deleteCategory,
  categorySchema
};
