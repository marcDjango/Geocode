const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const stations = await tables.charging_station.readAll();
    res.json(stations)
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
};
