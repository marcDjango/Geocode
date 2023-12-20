const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* ************************************************************************* */
// Import chargingStationControllers module for handling operations
const chargingStationControllers = require("./controllers/chargingStationControllers");

// Route to get a list of charging station
router.get("/charging-station", chargingStationControllers.browse);

// Route to get a specific item by ID
// router.get("/items/:id", chargingStationManager.read);

// Route to add a new item
// router.post("/items", chargingStationManager.add);

/* ************************************************************************* */

module.exports = router;
