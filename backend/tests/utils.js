const validateReservationProperties = (reservation, Array) => {
  Array.forEach((property) => {
    expect(reservation).toHaveProperty(property);
  });
};

module.exports = { validateReservationProperties };
