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

/**
 * Get categori by id
 */

router.get("/api/categories/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const category = await catHelpers.getCategoriesById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "error trying to get a category by id" });
  }
});

module.exports = router;
