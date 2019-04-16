const db = require("../dbConfig");

async function getAllSoupKitchen() {
  const allKitchens = await db("kitchens");

  return allKitchens;
}

async function getKitchenById(ids) {
  const kitchen = await db("kitchens")
    .where({ id })
    .first();

  return kitchen;
}

async function addKitchen(kitchen) {
  const [ids] = await db("kitchens").insert(kitchen);
  const item = getItemById(ids);

  return item;
}

async function editKitchen(id, kitchen) {
  const result = await db("kitchens")
    .where({ id })
    .update(kitchen);

  return result;
}

async function deleteKitchen(id) {
  const result = await db("kitchens")
    .where({ id })
    .del();

  return result;
}

module.exports = {
  getAllSoupKitchen,
  getKitchenById,
  addKitchen,
  editKitchen,
  deleteKitchen
};
