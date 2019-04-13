const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const restricted = require("../middleware/restrictedRoute");  for later
//const checkRole = require("../middleware/roleCheck");  for later

const userHelpers = require("../database/dbHelpers/userHelpers.js");

/**
 *  * [POST] /api/register
 *
 * Endpoint for creating/register a new user
 *
 * Exemple of payload
 * {
 *  name: {string} unique  - require
 *  password: {string}  - require
 *  email: {string} unique  - require
 *  role: {string}   - optional for now
 * }
 *
 */
router.post("/api/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 12);
  creds.password = hash;
  userHelpers
    .registerUser(creds)
    .then(user => {
      //const token = generateToken(user);
      res.status(200).json({
        //token,
        id: user.id,
        email: user.email,
        message: `User: ${user.name} was registered succesfully`
      });
    })
    .catch(err => {
      //console.log(err);
      res.status(500).json({ err: "eross" });
    });
});
