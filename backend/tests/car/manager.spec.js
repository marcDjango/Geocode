// Import required dependencies
const { database, tables } = require("../setup");

// // // Test suite for the brouse method of ItemManager
describe("brouse car", () => {
  it("should brouse an car successfully", async () => {
    // Define a sample car for testing
    const testCar = {
      car_image: "xxx",
      user_id: 1,
      brand_id: 1,
      plug_id: 1,
    };
    const result = await tables.car.add(testCar);
    const id = result.insertId;
    //     //     // Send a brouse request to the car table with a test car

    //     //     // Check if the newly added car exists in the database
    const [rows] = await database.query("select * from car where id = ?", id);

    const foundCar = rows[0];

    //     //     // Assertions
    expect(foundCar).toBeDefined();
    expect(foundCar.car_image).toBe(testCar.car_image);
    expect(foundCar.user_id).toBe(testCar.user_id);
    expect(foundCar.brand_id).toBe(testCar.brand_id);
    expect(foundCar.plug_id).toBe(testCar.plug_id);

    // it("should throw when passing invalid object", async () => {
    //   //     // Thx https://jestjs.io/docs/asynchronous#asyncawait

    //   //     // Send a create request to the item table with an empty object
    //   const promise = tables.car.add({});

    //   //     // Assertions
    //   await expect(promise).rejects.toThrow();
    // });
  });

  // // ***************************************************************************************************************************

  // describe("Read car", () => {
  //   it("should create an car successfully", async () => {
  //     // Define a sample car for testing
  //     const testCar = {
  //       car_image: "xxx",
  //       user_id: 1,
  //       brand_id: 1,
  //       plug_id: 1,
  //     };

  //     // Send a create request to the car table with a test car
  //     const insertId = await database.query(
  //       "insert into car(car_image, user_id, brand_id, plug_id) values(?,?,?,?)",
  //       [testCar.car_image, testCar.user_id, testCar.brand_id, testCar.plug_id]
  //     );

  //     // Check if the newly added car exists in the database
  //     const [rows] = await tables.car.read(insertId);

  //     const foundCar = rows[0];

  //     // Assertions
  //     expect(foundCar).toBeDefined();
  //     expect(foundCar.car_image).toBe(testCar.car_image);
  //     expect(foundCar.user_id).toBe(testCar.user_id);
  //     expect(foundCar.brand_id).toBe(testCar.brand_id);
  //     expect(foundCar.plug_id).toBe(testCar.plug_id);
  //   });

  //   it("should throw when passing invalid object", async () => {
  //     // Thx https://jestjs.io/docs/asynchronous#asyncawait

  //     // Send a create request to the item table with an empty object
  //     const promise = tables.car.read({});

  //     // Assertions
  //     await expect(promise).rejects.toThrow();
});
