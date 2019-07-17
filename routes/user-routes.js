const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const restricted = require("../middleware/tokenRestricted");
const emailCheck = require("../middleware/emailCheck");
const checkRole = require("../middleware/roleCheck");

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
router.post("/api/users/register", emailCheck, async (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 12);
    creds.password = hash;

    const result = await userHelpers.userSchema.isValid(req.body);

    if (result) {
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
            message: "please provide name, password , email and role for the user"
        });
    }

    // if (creds.name && creds.password && creds.email && creds.role) {
    //   userHelpers
    //     .registerUser(creds)
    //     .then(user => {
    //       //const token = generateToken(user);
    //       res.status(200).json({
    //         //token,
    //         id: user.id,
    //         email: user.email,
    //         message: `User: ${user.name} was registered succesfully`
    //       });
    //     })
    //     .catch(err => {
    //       //console.log(err);
    //       res.status(500).json({ err: "error trying to register user" });
    //     });
    // } else {
    //   res.status(401).json({
    //     message: "please provide name, password , email and role for the user"
    //   });
    // }
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
    let { email, password } = req.body;
    console.log(email, password);

    if (email && password) {
        userHelpers
            // .findBy({ name })
            .findBy({ email })
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
 *  * [GET] /api/users
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

// ⭐️ Get all users ⭐️
router.get("/api/users", restricted, checkRole, async (req, res) => {
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

// ⭐️ Get user by id ⭐️
router.get("/api/users/:id", restricted, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userHelpers.getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Id not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "error trying to get user by id" });
    }
});

// ⭐️ Update User ⭐️
router.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = req.body;

    try {
        const result = await userHelpers.updateUser(id, user);
        console.log(result);
        if (result === 1) {
            res.status(200).json({
                updateID: id,
                message: `User: ${user.name} Update succesfully`
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "error trying to update user" });
    }
});

// ⭐️ Delete User ⭐️
router.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await userHelpers.deleteUser(id);
        if (result === 1) {
            res.status(200).json({
                message: "Deleted Successfully"
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "error trying to delete user" });
    }
});

module.exports = router;
