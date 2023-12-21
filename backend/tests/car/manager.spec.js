// // Import required dependencies
// const { database, tables } = require("../setup");

// // Test suite for the create method of ItemManager
// describe("Create car", () => {
//   it("should create an car successfully", async () => {
//     // Define a sample car for testing
//     const testCar = {
//       user_id: 1,
//       brand_id: 1,
//       plug_id: 1,
//     };

//     // Send a create request to the car table with a test car
//     const insertId = await tables.car.create(testCar);

//     // Check if the newly added car exists in the database
//     const [rows] = await database.query(
//       "select * from car where id = ?",
//       insertId
//     );

//     const foundCar = rows[0];

//     // Assertions
//     expect(foundCar).toBeDefined();
//     expect(foundCar.title).toBe(testCar.title);
//   });

//   it("should throw when passing invalid object", async () => {
//     // Thx https://jestjs.io/docs/asynchronous#asyncawait

//     // Send a create request to the item table with an empty object
//     const promise = tables.car.create({});

//     // Assertions
//     await expect(promise).rejects.toThrow();
//   });
// });
