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

/**
 * Post a Kitchen in database
 */
router.post("/api/kitchens", async (req, res) => {
  const body = req.body;

  const valid = await kitchenHelpers.kitchenSchema.isValid(req.body);

  if (valid) {
    try {
      const result = await kitchenHelpers.addKitchen(body);
      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: "error trying to add the kitchen in database" });
    }
  } else {
    res.status(401).json({
      message:
        "Please provide name , location , mission and website for the Kitchen Soup"
    });
  }
});

/**
 * Edit Kitchen in database
 */
router.put("/api/kitchens/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await kitchenHelpers.editKitchen(id, body);
    if (result) {
      res.status(200).json({ message: `${body.name} was succesfully edited` });
    } else {
      res.status(404).json({ message: "Kitchen not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "error trying to edit the kitchen" });
  }
});

/**
 * Delete a kitchen
 */
router.delete("/api/kitchens/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await kitchenHelpers.deleteKitchen(id);
    if (result) {
      res.status(200).json({ message: "Kitchen succesfully deleted" });
    } else {
      res.status(404).json({ message: "Kitchen not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "error trying to delete the kitchen" });
  }
});

module.exports = router;
