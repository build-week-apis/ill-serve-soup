const db = require("../dbConfig");

function getAllUsers() {
  return db("users");
}

async function registerUser(creds) {
  const [id] = await db("users").insert(creds);

  const query = await db("users")
    .where({ id })
    .first();
  return query;
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

async function loginUser(creds) {
  const user = await db("users")
    .where({ name: creds.name })
    .first();

  return user;
}

//for later if necessary
function findUserByRole(role) {
  return db("users").where({ role });
}

function getUserById(id) {
  return db("users")
    .select("id", "name", "email", "role")
    .where({ id })
    .first();
}

function updateUser(id, user) {
  return db("users")
    .where({ id })
    .update(user);
}

async function deleteUser(id) {
  const result = await db("users")
    .where({ id })
    .del();

  return result;
}

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
  findBy,
  updateUser,
  deleteUser
};
