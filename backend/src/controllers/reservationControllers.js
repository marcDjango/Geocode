const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const reservations =
      await tables.user_has_charging_station.readAllReservation();
    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const reservation = await tables.user_has_charging_station.readReservation(
      req.params.id
    );
    if (reservation == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(reservation);
    }
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const reservation = await tables.user_has_charging_station.edit(
      req.body,
      req.params.id
    );
    if (reservation == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const reservation = await tables.user_has_charging_station.add(req.body);
    if (reservation == null) {
      res.sendStatus(404);
    } else {
      res.status(201).json(reservation);
    }
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const reservation = await tables.user_has_charging_station.delete(
      req.params.id
    );
    if (reservation.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
