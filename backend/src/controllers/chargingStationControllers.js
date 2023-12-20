const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const stations = await tables.charging_station.readAll();
    res.json(stations);
  } catch (error) {
    next(error);
  }
};
const read = async (req, res, next) => {
  try {
    const station = await tables.charging_station.read(req.params.id);
    if (station == null) {
      res.sendStatus(404);
    } else {
      res.json(station);
    }
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const station = await tables.charging_station.edit(req.body, req.params.id);
    if (station == null) {
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
};
