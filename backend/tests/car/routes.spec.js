const { app, request, database, tables } = require("../setup");

// Test suite for the GET /api/cars route
describe("GET /api/cars", () => {
  it("should fetch cars successfully", async () => {
    // Define a sample car for testing
    const newCar = {
      car_image: "xxx",
      user_id: 1,
      brand_id: 1,
      plug_id: 1,
    };

    // Create a sample car in the database

    const result = await tables.car.add(newCar);
    const id = result.insertId;
    // Send a GET request to the /api/cars endpoint
    const response = await request(app).get("/api/cars");

    // // Assertions
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // // Check if the created car is present in the response
    const foundcar = response.body.find((item) => item.id === id);

    // // Assertions
    expect(foundcar).toBeInstanceOf(Object);
    expect(foundcar.car_image).toBe(newCar.car_image);
    expect(foundcar.user_id).toBe(newCar.user_id);
    expect(foundcar.brand_id).toBe(newCar.brand_id);
    expect(foundcar.plug_id).toBe(newCar.plug_id);
  });
});

// Test suite for the GET /api/items/:id route
describe("GET /api/items/:id", () => {
  it("should fetch a single item successfully", async () => {
    // Define a sample item for testing
    const newCar = {
      car_image: "xxx",
      user_id: 1,
      brand_id: 1,
      plug_id: 1,
    };

    // Create a sample car in the database

    const result = await tables.car.add(newCar);
    const id = result.insertId;
    // Send a GET request to the /api/cars/:id endpoint
    const response = await request(app).get(`/api/cars/${id}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.body.id).toBe(id);
    expect(response.body.car_image).toBe(newCar.car_image);
    expect(response.body.user_id).toBe(newCar.user_id);
    expect(response.body.brand_id).toBe(newCar.brand_id);
    expect(response.body.plug_id).toBe(newCar.plug_id);
  });

  it("should return 404 for non-existent car", async () => {
    // Send a GET request to the /api/cars/:id endpoint with an invalid ID
    const response = await request(app).get("/api/cars/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/cars route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling log could help ;)
describe("POST /api/cars", () => {
  it("should add a new car successfully", async () => {
    // Define a sample car for testing
    const newCar = {
      car_image: "gkcghvjx",
      user_id: 1,
      brand_id: 1,
      plug_id: 1,
    };

    // Send a POST request to the /api/cars endpoint with a test car
    const response = await request(app).post("/api/cars").send(newCar);

    // Assertions
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("insertId");
    expect(typeof response.body.insertId).toBe("number");

    // Check if the newly added car exists in the database
    const [result] = await database.query(
      "select * from car where id = ?",
      response.body.insertId
    );
    const [foundcar] = result;
    //   // Assertions
    expect(foundcar).toBeDefined();
    expect(foundcar).toHaveProperty("id");
    expect(foundcar.id).toBe(response.body.insertId);
    expect(foundcar.car_image).toBe(newCar.car_image);
    expect(typeof foundcar.car_image).toBe("string");
    expect(foundcar).toHaveProperty("user_id");
    expect(foundcar.user_id).toBe(newCar.user_id);
    expect(typeof foundcar.user_id).toBe("number");
    expect(foundcar).toHaveProperty("brand_id");
    expect(foundcar.brand_id).toBe(newCar.brand_id);
    expect(typeof foundcar.brand_id).toBe("number");
    expect(foundcar).toHaveProperty("plug_id");
    expect(foundcar.plug_id).toBe(newCar.plug_id);
    expect(typeof foundcar.plug_id).toBe("number");
  });
});

// TODO: implement PUT and DELETE routes

// Test suite for the PUT /api/cars/:id route
describe("PUT /api/cars/:id", () => {
  it("should update an existing car successfully", async () => {
    // Define a sample car for testing
    const newCar = {
      car_image: "xxx",
      user_id: 1,
      brand_id: 1,
      plug_id: 1,
    };

    //     // Create a sample car in the database
    const result = await tables.car.add(newCar);
    const id = result.insertId;

    //     // Define an updated car object
    const updatedcar = {
      car_image: "xxx",
      user_id: 1,
      brand_id: 2,
      plug_id: 1,
    };

    //     // Send a PUT request to the /api/cars/:id endpoint with updated data
    const response = await request(app).put(`/api/cars/${id}`).send(updatedcar);

    //     // Assertions
    expect(response.status).toBe(204);

    // Check if the car has been updated in the database
    const foundcar = await tables.car.read(id);

    // Assertions
    expect(foundcar).toBeDefined();
    expect(foundcar.car_image).toBe(updatedcar.car_image);
    expect(foundcar.user_id).toBe(updatedcar.user_id);
    expect(foundcar.brand_id).toBe(updatedcar.brand_id);
    expect(foundcar.plug_id).toBe(updatedcar.plug_id);
  });
});

// // Test suite for the DELETE /api/cars/:id route
describe("DELETE /api/cars/:id", () => {
  it("should delete an existing car successfully", async () => {
    // Define a sample car for testing
    const newCar = {
      car_image: "xxx",
      user_id: 1,
      brand_id: 1,
      plug_id: 1,
    };
    // Create a sample car in the database
    const result = await tables.car.add(newCar);
    const id = result.insertId;

    // Send a DELETE request to the /api/cars/:id endpoint
    const response = await request(app).delete(`/api/cars/${id}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the car has been deleted from the database
    const foundcar = await tables.car.read(id);

    // Assertions
    expect(foundcar).toBeUndefined();
  });
});
