const AbstractManager = require("./AbstractManager");

class chargingStationManager extends AbstractManager {
  constructor() {
    super({ table: "charging_station" });
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }
}
module.exports = chargingStationManager;
