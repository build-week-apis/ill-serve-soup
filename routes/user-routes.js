const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const restricted = require("../middleware/tokenRestricted");
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
router.post("/api/users/register", (req, res) => {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 12);
  creds.password = hash;

  if (creds.name && creds.password && creds.email) {
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
        res.status(500).json({ err: "error trying to register user" });
      });
  } else {
    res.status(401).json({
      message: "please provide name, password and email for the user"
    });
  }
});

/**
 *  //Function for creating the token from user information
 *
 * @param {object} user
 */
function makeTokenFromUser(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
    email: user.email
  };
  const secret = process.env.SECRET || "secret text - came from .env";
  const options = {
    expiresIn: "20h"
  };

  const token = jwt.sign(payload, secret, options);

  return token;
}

/**
 *  * [POST] /api/register
 *
 * Endpoint for login a user
 *
 * Exemple of payload
 * {
 *  name: {string}   - require
 *  password: {string}   - require
 * }
 *
 */
router.post("/api/users/login", (req, res) => {
  let { name, password } = req.body;

  if (name && password) {
    userHelpers
      .findBy({ name })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = makeTokenFromUser(user);
          res.status(200).json({
            message: `Welcome ${user.name}!`,
            token: token,
            role: user.role,
            id: user.id
          });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ error: "error trying to login user" });
      });
  } else {
    res.status(400).json({ message: "please provide username and password" });
  }
});

/**
 *  * [GET] /api/register
 *
 * Endpoint for Getting all the users 
 * 
 * Requirements: need authorization header with token
 *               need role of user: Admin || Staff
 *
 * Exemple of Response from the server
 {[
         {
            "id": 14,
            "name": "Mia",
            "email": "mia@yahoo.com",
            "password": "$2a$12$kFQU7QYCQrq.SA5Wk7JUAOPVjERLaBY44kkEMh/1qHE9yos1nYrLW",
            "role": "manager"
        }
    ],
    "decoded": {
        "subject": 14,
        "role": "manager",
        "email": "mia@yahoo.com",
        "iat": 1555164970,
        "exp": 1555236970
    }
}
 *
 */
router.get("/api/users", restricted, async (req, res) => {
  try {
    const users = await userHelpers.getAllUsers();
    res.status(200).json({
      users,
      decoded: req.decodedToken
    });
  } catch (error) {
    res.status(500).json({ error: "error trying to get users" });
  }
});

module.exports = router;
