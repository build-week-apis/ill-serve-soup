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
      items.image = "https://i.imgur.com/w9mdmPo.jpg";
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

/**
 * Endpoint for getting a item by Id
 */
router.get("/api/items/:id", restricted, async (req, res) => {
  const { id } = req.params;

  try {
    const item = await itemHelpers.getItemById(id);
    if (item) {
      if (item.image === "") {
        item.image = "https://i.imgur.com/w9mdmPo.jpg";
      }
      res.status(200).json({
        item,
        decodedToken: req.decodedToken
      });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "there was a error trying to get a item by id from database"
    });
  }
});

/**
 * Endpoint for Add a item in database
 */
router.post("/api/items", restricted, async (req, res) => {
  const { name, amount } = req.body;
  if (name && amount) {
    try {
      const item = await itemHelpers.addItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      res
        .status(500)
        .json({ error: "there was a error trying to add item in database" });
    }
  } else {
    res
      .status(401)
      .json({ message: "please provide name and amount for the item" });
  }
});

/**
 * Endpoint for Edit a item from database
 */
router.put("/api/items/:id", restricted, async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await itemHelpers.updateItem(id, body);
    if (result) {
      res
        .status(200)
        .json({ message: `Item ${body.name} was succesfully edited` });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "there was a error trying to edit the item" });
  }
});

/**
 * Endpoint for Deleting a item
 */
router.delete("/api/items/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await itemHelpers.deleteItem(id);
    if (result) {
      res.status(200).json({ message: "Item succesfully deleted" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "there was a error trying to delete the item from database"
    });
  }
});

module.exports = router;
