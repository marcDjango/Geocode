const AbstractManager = require("./AbstractManager");

class chargingStationManager extends AbstractManager {
  constructor() {
    super({ table: "charging_station" });
  }

  async read(id) {
    const [row] = await this.database.query(
      `select * from ${this.table} where id =?`,
      [id]
    );
    return row[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async edit(body, id) {
    function isArray(data) {
      return Object.values(data).map((arr) =>
        Array.isArray(arr) ? JSON.stringify(arr) : arr
      );
    }

    const values = isArray(body);
    const params = Object.keys(body);
    const setParams = params.map((item) => `${item} = ?`).join(", ");

    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET ${setParams} WHERE id = ?`,
      [...values, id]
    );
    return rows;
  }

  async add(body) {
    function isArray(data) {
      return Object.values(data).map((arr) =>
        Array.isArray(arr) ? JSON.stringify(arr) : arr
      );
    }

    const values = isArray(body);
    const params = Object.keys(body);
    const setParams = params.map((item) => item).join(", ");
    const placeholder = params.map(() => "? ").join(", ");

    const [rows] = await this.database.query(
      `INSERT INTO ${this.table}(${setParams}) VALUES (${placeholder})`,
      [...values]
    );
    return rows;
  }

  async delete(id) {
    const [rows] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return rows;
  }
}
module.exports = chargingStationManager;
