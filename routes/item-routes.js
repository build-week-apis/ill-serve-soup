const express = require("express");
const router = express.Router();
const restricted = require("../middleware/tokenRestricted");
const itemHelpers = require("../database/dbHelpers/itemHelpers");

/**
 *  Endpoint for getting all items from database
 */

router.get("/api/items", restricted, async (req, res) => {
  try {
    const items = await itemHelpers.getAllItems();
    if (items.image === "") {
      item.image = "https://i.imgur.com/w9mdmPo.jpg";
    }
    res.status(200).json({
      items,
      decodedToken: req.decodedToken
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a error trying to get all the items from database"
    });
  }
});

module.exports = router;
