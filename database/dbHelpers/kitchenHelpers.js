const db = require("../dbConfig");
const yup = require("yup");

let kitchenSchema = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  mission: yup.string().required(),
  average_visitors: yup
    .number()
    .required()
    .positive()
    .integer(),
  website: yup.string()
});

async function getAllSoupKitchen() {
  const allKitchens = await db("kitchens");

  return allKitchens;
}

async function getKitchenById(id) {
  const kitchen = await db("kitchens")
    .where({ id })
    .first();

  return kitchen;
}

async function addKitchen(kitchen) {
  const [ids] = await db("kitchens")
    .insert(kitchen)
    .returning("id");
  const item = getKitchenById(ids);

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
  deleteKitchen,
  kitchenSchema
};
