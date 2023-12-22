const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const stations = await tables.car.readAll();
    res.json(stations);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const station = await tables.car.read(req.params.id);
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
    const station = await tables.car.edit(req.body, req.params.id);
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
    const station = await tables.car.add(req.body);
    if (station == null) {
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
    const result = await tables.car.delete(req.params.id);
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
