const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || "secret text - came from .env";
const itemHelpers = require("../database/dbHelpers/itemHelpers");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  let currentUserEmail = "";

  //function for decoded the token to get currentUserEmail
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedToken = decodedToken;
        userEmail = decodedToken.email;
        next();
      }
    });
  }

  const it = await itemHelpers.getAllItems();
  console.log(userEmail);
  const amount = it.map(item => {
    if (item.amount === 0) {
      console.log(
        `${item.name} with amount: ${
          item.amount
        } a order must be put from ${currentUserEmail} to supplier email: ${
          item.supplier_name
        }`
      );
    }
  });
};
