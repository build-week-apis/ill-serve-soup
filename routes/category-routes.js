const express = require("express");
const router = express.Router();
const restricted = require("../middleware/tokenRestricted");
const catHelpers = require("../database/dbHelpers/categoriesHelper");

/**
 * GET all categories from database
 */

router.get("/api/categories", restricted, async (req, res) => {
  try {
    const categories = await catHelpers.getAllCategories();
    res.status(200).json({
      categories,
      decodedToken: req.decodedToken
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "there was a error trying to get categories" });
  }
});

module.exports = router;
