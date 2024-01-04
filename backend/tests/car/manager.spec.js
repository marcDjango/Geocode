// Import required dependencies
const { database, tables } = require("../setup");
const { carCreate, carUpdate } = require("../testdata");

describe("Create station", () => {
  it("should create an station successfully", async () => {
    const resalt = await tables.car.add(carCreate);
    const [rows] = await database.query(
      `select * from ${tables.car.table} where id = ?`,
      [resalt]
    );
    expect(rows.length).toBe(1);
    return rows;
  });

  it("should read a charging station successfully", async () => {
    const resalt = await tables.car.add(carCreate);
    const [station] = await database.query(
      `select * from ${tables.car.table} where id = ?`,
      [resalt]
    );

    expect(station[0].id).toEqual(resalt);
  });

  it("should update a charging station successfully", async () => {
    const resalt = await tables.car.add(carCreate);
    await tables.car.edit(carUpdate, resalt);

    const [updatedStation] = await database.query(
      `select * from ${tables.car.table} where id = ?`,
      [resalt]
    );

    expect(updatedStation.someProperty).toEqual(carUpdate.someProperty);
  });

  it("should delete a charging station successfully", async () => {
    const resalt = await tables.car.add(carCreate);
    await tables.car.delete(resalt);
    const [deletedStation] = await database.query(
      `select * from ${tables.car.table} where id = ?`,
      [resalt]
    );

    expect(deletedStation).toEqual([]);
  });
});
