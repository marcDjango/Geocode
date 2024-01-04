// Import required dependencies
const { app, request, tables } = require("../setup");
const { reservationCreate, reservationUpdate } = require("../testdata");
const { validateReservationProperties } = require("../utils");

// Test suite for the GET /api/reservations route

describe("GET /api/reservations", () => {
  it("should fetch reservations successfully", async () => {
    // Create a sample reservation in the database
    const result = await tables.user_has_charging_station.add(
      reservationCreate
    );

    const insertedId = result;
    // Send a GET request to the /api/reservations endpoint
    const response = await request(app).get("/api/reservations");
    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Validation plus détaillée de la réponse
    const reservations = response.body;
    expect(reservations.length).toBeGreaterThan(0);
    const expectedProperties = [
      "id",
      "user_id",
      "charging_station_id",
      "reservation_date",
      "amount_paid",
    ];
    // Fonction pour valider les propriétés d'une réservation

    // Fonction pour trouver une réservation dans la liste
    const findReservation = (reservationsTable, reservationToFind) => {
      return reservationsTable.find((reservation) =>
        Object.keys(reservationToFind).every(
          (key) => reservation[key] === reservationToFind[key]
        )
      );
    };

    // Utilisation de la fonction de validation
    reservations.forEach((reservation) =>
      validateReservationProperties(reservation, expectedProperties)
    );

    // Utilisation de la fonction pour trouver une réservation
    const foundReservation = findReservation(reservations, {
      user_id: reservationCreate.user_id,
      charging_station_id: reservationCreate.charging_station_id,
      reservation_date: reservationCreate.reservation_date,
      amount_paid: reservationCreate.amount_paid,
      id: insertedId,
    });

    // Ensuite, vous pouvez effectuer des assertions sur foundReservation si nécessaire
    expect(foundReservation).toBeDefined();
  });
});

// Test suite for the GET /api/reservations/:id route
describe("GET /api/reservation/:id", () => {
  let samplereservation;
  beforeAll(async () => {
    // Créer une voiture de test pour le test
    const result = await tables.user_has_charging_station.add(
      reservationCreate
    );
    samplereservation = await tables.user_has_charging_station.read(result);
  });
  it("should fetch a single reservation successfully", async () => {
    // Envoyer une requête GET à l'endpoint /api/reservations/:id avec l'ID de la voiture de test
    const response = await request(app).get(
      `/api/reservation/${samplereservation.id}`
    );
    // Assertions

    expect(response.status).toBe(200);

    const returnedreservation = response.body;

    expect(returnedreservation).toEqual(samplereservation);
  });

  it("should return 404 for non-existent reservation", async () => {
    // Send a GET request to the /api/reservations/:id endpoint with an invalid ID
    const response = await request(app).get("/api/reservations/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// // // Test suite for the POST /api/reservations route
// // Doesn't pass: maybe something to change in app config :/
// // Hint: enabling log could help ;)
describe("POST /api/reservation", () => {
  it("should add a new reservation successfully", async () => {
    // Send a POST request to the /api/reservations endpoint with a test reservation
    const response = await request(app)
      .post("/api/reservation")
      .send(reservationCreate);

    // Assertions
    expect(response.status).toBe(201);
    // expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual(expect.any(Number));

    // Check if the newly added reservation exists in the database
    const foundreservation = await tables.user_has_charging_station.read(
      response.body
    );

    // Assertions
    expect(foundreservation).toBeDefined();
    expect(foundreservation).toEqual(
      expect.objectContaining(reservationCreate)
    );
  });
});

// // // // TODO: implement PUT and DELETE routes

// // // // Test suite for the PUT /api/reservations/:id route
describe("PUT /api/reservation/:id", () => {
  it("should update an existing reservation successfully", async () => {
    // Send a PUT request to the /api/reservations/:id endpoint with updated data
    const result = await tables.user_has_charging_station.add(
      reservationCreate
    );
    const id = result;
    const response = await request(app)
      .put(`/api/reservation/${id}`)
      .send(reservationUpdate);
    // Assertions
    expect(response.status).toBe(204);

    // Check if the reservation has been updated in the database
    const foundreservation = await tables.user_has_charging_station.read(id);

    // Assertions
    expect(foundreservation).toBeDefined();
    expect(foundreservation).toEqual(
      expect.objectContaining(reservationUpdate)
    );
  });
});

// // // // Test suite for the DELETE /api/reservations/:id route
describe("DELETE /api/reservation/:id", () => {
  it("should delete an existing reservation successfully", async () => {
    // Send a DELETE request to the /api/reservations/:id endpoint
    const result = await tables.user_has_charging_station.add(
      reservationCreate
    );

    const id = result;
    const response = await request(app).delete(`/api/reservation/${id}`);

    // Assertions
    expect(response.status).toBe(204);

    // Check if the reservation has been deleted from the database
    const foundreservation = await tables.user_has_charging_station.read(id);

    // Assertions
    expect(foundreservation).toBeUndefined();
  });
  it("should return 404 for non-existent reservation", async () => {
    // Envoyer une requête DELETE à l'endpoint /api/reservations/:id avec un ID qui n'existe pas
    const response = await request(app).delete("/api/reservation/0");

    // Assertions
    expect(response.status).toBe(404);
  });
});
