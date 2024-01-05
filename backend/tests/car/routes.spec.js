// Import required dependencies
const { app, request, tables } = require("../setup");
const { carCreate, carUpdate } = require("../testdata");

// Test suite for the GET /api/cars route

describe("GET /api/cars", () => {
  it("should fetch cars successfully", async () => {
    // Create a sample car in the database
    const result = await tables.car.add(carCreate);
    const id = result;
    // Send a GET request to the /api/cars endpoint
    const response = await request(app).get("/api/cars");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Validation plus détaillée de la réponse
    const cars = response.body;
    expect(cars.length).toBeGreaterThan(0);

    // Vérifier la structure de chaque voiture dans la réponse
    cars.forEach((car) => {
      expect(car).toHaveProperty("id");
      expect(car).toHaveProperty("car_image");
      expect(car).toHaveProperty("user_id");
      expect(car).toHaveProperty("brand_id");
      expect(car).toHaveProperty("plug_id");
    });

    const foundCar = cars.find(
      (car) =>
        car.car_image === carCreate.car_image &&
        car.user_id === carCreate.user_id &&
        car.brand_id === carCreate.brand_id &&
        car.plug_id === carCreate.plug_id &&
        car.id === id
    );

    // Assertions
    expect(foundCar).toBeDefined();
  });
});

// Test suite for the GET /api/cars/:id route
describe("GET /api/car/:id", () => {
  let sampleCar;
  beforeAll(async () => {
    // Créer une voiture de test pour le test
    const result = await tables.car.add(carCreate);
    sampleCar = await tables.car.read(result);
  });
  it("should fetch a single car successfully", async () => {
    // Envoyer une requête GET à l'endpoint /api/cars/:id avec l'ID de la voiture de test
    const response = await request(app).get(`/api/car/${sampleCar.id}`);
    // Assertions

    expect(response.status).toBe(200);

    const returnedCar = response.body;

    expect(returnedCar).toEqual(sampleCar);
  });

  it("should return 404 for non-existent car", async () => {
    // Send a GET request to the /api/cars/:id endpoint with an invalid ID
    const response = await request(app).get("/api/car/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// // Test suite for the POST /api/cars route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling log could help ;)
describe("POST /api/car", () => {
  it("should add a new car successfully", async () => {
    // Send a POST request to the /api/cars endpoint with a test car
    const response = await request(app).post("/api/car").send(carCreate);
    // Assertions
    expect(response.status).toBe(201);
    // expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual(expect.any(Number));

    // Check if the newly added car exists in the database
    const foundCar = await tables.car.read(response.body);

    // Assertions
    expect(foundCar).toBeDefined();
    expect(foundCar).toEqual(expect.objectContaining(carCreate));
  });
});

// // // TODO: implement PUT and DELETE routes

// // // Test suite for the PUT /api/cars/:id route
describe("PUT /api/car/:id", () => {
  it("should update an existing car successfully", async () => {
    // Send a PUT request to the /api/cars/:id endpoint with updated data
    const result = await tables.car.add(carCreate);
    const id = result;
    const response = await request(app).put(`/api/car/${id}`).send(carUpdate);
    // Assertions
    expect(response.status).toBe(204);

    // Check if the car has been updated in the database
    const foundCar = await tables.car.read(id);

    // Assertions
    expect(foundCar).toBeDefined();
    expect(foundCar).toEqual(expect.objectContaining(carUpdate));
  });
});

// // // Test suite for the DELETE /api/cars/:id route
describe("DELETE /api/car/:id", () => {
  it("should delete an existing car successfully", async () => {
    // Send a DELETE request to the /api/cars/:id endpoint
    const result = await tables.car.add(carCreate);
    const id = result;
    const response = await request(app).delete(`/api/car/${id}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the car has been deleted from the database
    const foundcar = await tables.car.read(id);

    // Assertions
    expect(foundcar).toBeUndefined();
  });
  it("should return 404 for non-existent car", async () => {
    // Envoyer une requête DELETE à l'endpoint /api/cars/:id avec un ID qui n'existe pas
    const response = await request(app).delete("/api/car/0");

    // Assertions
    expect(response.status).toBe(404);
  });
});
