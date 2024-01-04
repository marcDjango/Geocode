const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations

const chargingStationControllers = require("./controllers/chargingStationControllers");
const carControllers = require("./controllers/carControllers");
const reservationControllers = require("./controllers/reservationControllers");
const validateCar = require("./middlewares/validateCar");

// Route to get a list of charging station
router.get("/charging-station", chargingStationControllers.browse);
router.get("/charging-station/:id", chargingStationControllers.read);
router.put("/charging-station/:id", chargingStationControllers.edit);
router.post("/charging-station/", chargingStationControllers.add);
router.delete("/charging-station/:id", chargingStationControllers.destroy);

// Route to get a list of cars
router.get("/cars", carControllers.browse);
router.get("/car/:id", carControllers.read);
router.put("/car/:id", validateCar, carControllers.edit);
router.post("/car/", validateCar, carControllers.add);
router.delete("/car/:id", carControllers.destroy);

// Route to get a list of reservations
router.get("/reservations", reservationControllers.browse);
router.get("/reservation/:id", reservationControllers.read);
router.put("/reservation/:id", reservationControllers.edit);
router.post("/reservation/", reservationControllers.add);
router.delete("/reservation/:id", reservationControllers.destroy);
module.exports = router;
