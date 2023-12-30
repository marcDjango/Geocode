const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import chargingStationControllers module for handling operations
const chargingStationControllers = require("./controllers/chargingStationControllers");

// Route to get a list of charging station
router.get("/charging-station", chargingStationControllers.browse);
router.get("/charging-station/:id", chargingStationControllers.read);
router.post("/charging-station/", chargingStationControllers.add);
router.put("/charging-station/:id", chargingStationControllers.edit);
router.delete("/charging-station/:id", chargingStationControllers.destroy);
/* ************************************************************************* */

// Import chargingStationControllers module for handling operations
const userControllers = require("./controllers/userControllers");

// Route to get a list of charging station
router.get("/users", userControllers.browse);
router.get("/user/:id", userControllers.read);
router.post("/user/", userControllers.add);
router.put("/user/:id", userControllers.edit);
router.delete("/user/:id", userControllers.destroy);
/* ************************************************************************* */

module.exports = router;
