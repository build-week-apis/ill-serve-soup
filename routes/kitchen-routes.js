const express = require("express");
const router = express.Router();
//const restricted = require("../middleware/tokenRestricted");
const kitchenHelpers = require("../database/dbHelpers/kitchenHelpers");

/**
 * Get All Kitchens from database
 */

router.get("/api/kitchens", async (req, res) => {
  try {
    const allKitchens = await kitchenHelpers.getAllSoupKitchen();
    res.status(200).json(allKitchens);
  } catch (error) {
    res
      .status(500)
      .json({ error: "error trying to get all kitchens from database" });
  }
});

module.exports = router;
