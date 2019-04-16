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

/**
 * Get Kitchen by id
 */
router.get("/api/kitchens/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const kitchen = await kitchenHelpers.getKitchenById(id);
    if (kitchen) {
      res.status(200).json({ kitchen });
    } else {
      res.status(404).json({ message: "Id not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "error trying to get a kitchen by id" });
  }
});

module.exports = router;
