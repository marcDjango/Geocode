const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import auth services for security operations
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");

// Import itemControllers module for handling item-related operations

const chargingStationControllers = require("./controllers/chargingStationControllers");
const carControllers = require("./controllers/carControllers");
const reservationControllers = require("./controllers/reservationControllers");

// Import Middlewares
const validateCar = require("./middlewares/validateCar");
const validateUser = require("./middlewares/validateUser");
const validateReservation = require("./middlewares/validateReservation");
const validateChargingStation = require("./middlewares/validateChargingStation");

// Route to get a list of charging station
router.get("/charging-station", chargingStationControllers.browse);
router.get("/charging-station/:id", chargingStationControllers.read);
router.put(
  "/charging-station/:id",
  validateChargingStation,
  chargingStationControllers.edit
);
router.post(
  "/charging-station/",
  validateChargingStation,
  chargingStationControllers.add
);
router.delete("/charging-station/:id", chargingStationControllers.destroy);
/* ************************************************************************* */

// Import chargingStationControllers module for handling operations
const userControllers = require("./controllers/userControllers");

// Route to get a list of charging station
router.get("/users", verifyToken, userControllers.browse);
router.get("/user/:id", verifyToken, userControllers.read);
router.post("/user/", validateUser, hashPassword, userControllers.add);
router.post(
  "/users/login",
  userControllers.readByEmailAndPassToNext,
  verifyPassword
);
router.put("/user/:id", verifyToken, validateUser, userControllers.edit);
router.delete("/user/:id", verifyToken, userControllers.destroy);

// Route to get a list of cars
router.get("/cars", carControllers.browse);
router.get("/car/:id", carControllers.read);
router.put("/car/:id", validateCar, carControllers.edit);
router.post("/car/", validateCar, carControllers.add);
router.delete("/car/:id", carControllers.destroy);

// Route to get a list of reservations
router.get("/reservations", reservationControllers.browse);
router.get("/reservation/:id", reservationControllers.read);
router.put(
  "/reservation/:id",
  validateReservation,
  reservationControllers.edit
);
router.post("/reservation/", validateReservation, reservationControllers.add);
router.delete("/reservation/:id", reservationControllers.destroy);

module.exports = router;
