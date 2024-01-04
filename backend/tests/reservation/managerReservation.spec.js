const { database, tables } = require("../setup");
const { reservationCreate, reservationUpdate } = require("../testdata");

describe("Create station", () => {
  it("should create an station successfully", async () => {
    const resalt = await tables.user_has_charging_station.add(
      reservationCreate
    );
    const [rows] = await database.query(
      `select * from ${tables.user_has_charging_station.table} where id = ?`,
      [resalt]
    );
    expect(rows.length).toBe(1);
    return rows;
  });

  it("should read a charging station successfully", async () => {
    const resalt = await tables.user_has_charging_station.add(
      reservationCreate
    );
    const [station] = await database.query(
      `select * from ${tables.user_has_charging_station.table} where id = ?`,
      [resalt]
    );

    expect(station[0].id).toEqual(resalt);
  });

  it("should update a charging station successfully", async () => {
    const resalt = await tables.user_has_charging_station.add(
      reservationCreate
    );
    await tables.user_has_charging_station.edit(reservationUpdate, resalt);

    const [updatedStation] = await database.query(
      `select * from ${tables.user_has_charging_station.table} where id = ?`,
      [resalt]
    );

    expect(updatedStation.someProperty).toEqual(reservationUpdate.someProperty);
  });

  it("should delete a charging station successfully", async () => {
    const resalt = await tables.user_has_charging_station.add(
      reservationCreate
    );
    await tables.user_has_charging_station.delete(resalt);
    const [deletedStation] = await database.query(
      `select * from ${tables.user_has_charging_station.table} where id = ?`,
      [resalt]
    );

    expect(deletedStation).toEqual([]);
  });
});
