const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations

const chargingStationControllers = require("./controllers/chargingStationControllers");
const carControllers = require("./controllers/carControllers");

// Route to get a list of charging station
router.get("/charging-station", chargingStationControllers.browse);
router.get("/charging-station/:id", chargingStationControllers.read);
router.put("/charging-station/:id", chargingStationControllers.edit);
router.post("/charging-station/", chargingStationControllers.add);
router.delete("/charging-station/:id", chargingStationControllers.destroy);

// Route to get a list of
router.get("/cars", carControllers.browse);
router.get("/cars/:id", carControllers.read);
router.put("/cars/:id", carControllers.edit);
router.post("/cars/", carControllers.add);
router.delete("/cars/:id", carControllers.destroy);

module.exports = router;
