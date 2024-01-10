// Import required dependencies
const { app, request, tables } = require("../setup");
const { userCreate, userUpdate } = require("../testdata");

// Test suite for the GET /api/users route

describe("GET /api/users", () => {
  it("should fetch users successfully", async () => {
    // Create a sample user in the database

    const result = await tables.user.add(userCreate);
    // Send a GET request to the /api/users endpoint
    const response = await request(app).get("/api/users");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Check if the created user is present in the response
    const founduser = response.body.find((user) => user.id === result);
    // Assertions
    expect(founduser).toBeInstanceOf(Object);
  });
});

// Test suite for the GET /api/users/:id route
describe("GET /api/user/:id", () => {
  let sampleuser;
  beforeAll(async () => {
    // Créer une voiture de test pour le test
    const result = await tables.user.add(userCreate);
    sampleuser = await tables.user.readUser(result);
  });
  it("should fetch a single user successfully", async () => {
    // Envoyer une requête GET à l'endpoint /api/users/:id avec l'ID de la voiture de test
    const response = await request(app).get(`/api/user/${sampleuser.id}`);
    // Assertions

    expect(response.status).toBe(200);

    const returnedUser = response.body;

    expect(returnedUser).toEqual(sampleuser);
  });

  it("should return 404 for non-existent user", async () => {
    // Send a GET request to the /api/users/:id endpoint with an invalid ID
    const response = await request(app).get("/api/users/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/users route
describe("POST /api/user", () => {
  it("should add a new user successfully", async () => {
    // Send a POST request to the /api/users endpoint with a test user
    const response = await request(app).post("/api/user").send(userCreate);

    // Assertions
    expect(response.status).toBe(201);
    // expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual(expect.any(Number));

    // Check if the newly added user exists in the database
    const founduser = await tables.user.readUser(response.body);

    // Assertions
    expect(founduser).toBeDefined();
    expect(founduser).toEqual(expect.objectContaining(userCreate));
  });
});

// Test suite for the PUT /api/users/:id route
describe("PUT /api/user/:id", () => {
  it("should update an existing user successfully", async () => {
    // Send a PUT request to the /api/users/:id endpoint with updated data
    const result = await tables.user.add(userCreate);
    const id = result;
    const response = await request(app).put(`/api/user/${id}`).send(userUpdate);
    // Assertions
    expect(response.status).toBe(204);

    // Check if the user has been updated in the database
    const founduser = await tables.user.readUser(id);

    // Assertions
    expect(founduser).toBeDefined();
    expect(founduser).toEqual(expect.objectContaining(userUpdate));
  });
});

// Test suite for the DELETE /api/users/:id route
describe("DELETE /api/user/:id", () => {
  it("should delete an existing user successfully", async () => {
    // Send a DELETE request to the /api/users/:id endpoint
    const result = await tables.user.add(userCreate);

    const id = result;
    const response = await request(app).delete(`/api/user/${id}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the user has been deleted from the database
    const founduser = await tables.user.readUser(id);

    // Assertions
    expect(founduser).toBeUndefined();
  });
  it("should return 404 for non-existent user", async () => {
    // Envoyer une requête DELETE à l'endpoint /api/users/:id avec un ID qui n'existe pas
    const response = await request(app).delete("/api/user/0");

    // Assertions
    expect(response.status).toBe(404);
  });
});
