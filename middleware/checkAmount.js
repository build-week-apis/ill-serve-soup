const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || "secret text - came from .env";
const itemHelpers = require("../database/dbHelpers/itemHelpers");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
        currentUserEmail = decodedToken.email;
        next();
      }
    });
  }

  const it = await itemHelpers.getAllItems();
  it.map(item => {
    if (item.amount === 0) {
      //   console.log(
      //     `${item.name} with amount: ${
      //       item.amount
      //     } a order must be put from ${currentUserEmail} to supplier email: ${
      //       item.supplier_contact
      //     }`
      //   );
      const msg = {
        to: `${currentUserEmail}`,
        from: `${item.supplier_contact}`,
        subject: `${item.name} is out of Stock!!`,
        text: `Please send us 10 more gals of ${item.name}`,
        html: "<strong>and easy to do anywhere, even with Node.js</strong>"
      };
      sgMail.send(msg);
      //console.log(sgMail.send(msg));
    }
  });
};
