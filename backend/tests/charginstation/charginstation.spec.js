// Import required dependencies
const { database, tables } = require("../setup");
const { chargingStationToCreate } = require("../testdata");

describe("Create station", () => {
  const persistentDatas = {};
  it("should create an station successfully", async () => {
    persistentDatas.insertId = await tables.charging_station.add(
      chargingStationToCreate
    );

    // Check if the newly added item exists in the database
    const [rows] = await database.query(
      `select * from ${tables.charging_station} where id = ?`,
      [persistentDatas.insertId]
    );
    return rows;
  });
});
