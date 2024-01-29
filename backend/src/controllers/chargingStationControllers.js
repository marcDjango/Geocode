const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const stations = await tables.charging_station.readAll();
    const newStations = stations.map((row) => {
      const newRow = { ...row };
      newRow.adresse_station = Buffer.from(
        newRow.adresse_station,
        "latin1"
      ).toString("utf8");
      return newRow;
    });
    res.status(200).json(newStations);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const station = await tables.charging_station.read(req.params.id);
    if (!station) {
      res.sendStatus(404);
    } else {
      res.status(200).json(station);
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

const add = async (req, res, next) => {
  try {
    const station = await tables.charging_station.add(req.body);
    if (!station) {
      res.sendStatus(404);
    } else {
      res.status(201).json(station);
    }
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await tables.charging_station.delete(req.params.id);
    if (result.affectedRows === 0) {
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
