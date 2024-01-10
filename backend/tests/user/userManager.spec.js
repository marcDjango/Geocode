// Import required dependencies
const { database, tables } = require("../setup");
const { userCreate, userUpdate } = require("../testdata");

describe("Create user", () => {
  it("should create an user successfully", async () => {
    const result = await tables.user.add(userCreate);
    const [rows] = await database.query(
      `select * from ${tables.user.table} where id = ?`,
      [result]
    );
    expect(rows.length).toBe(1);
    return rows;
  });

  it("should read a charging user successfully", async () => {
    const result = await tables.user.add(userCreate);
    const [user] = await database.query(
      `select * from ${tables.user.table} where id = ?`,
      [result]
    );

    expect(user[0].id).toEqual(result);
  });

  it("should update a charging user successfully", async () => {
    const result = await tables.user.add(userCreate);
    await tables.user.edit(userUpdate, result);

    const [updateduser] = await database.query(
      `select * from ${tables.user.table} where id = ?`,
      [result]
    );

    expect(updateduser.someProperty).toEqual(userUpdate.someProperty);
  });

  it("should delete a charging user successfully", async () => {
    const result = await tables.user.add(userCreate);
    await tables.user.delete(result);
    const [deleteduser] = await database.query(
      `select * from ${tables.user.table} where id = ?`,
      [result]
    );

    expect(deleteduser).toEqual([]);
  });
});
