export const reservation = {
  user_id: {
    value: "User id",
    type: "text",
    option: "required",
  },
  charging_station_id: {
    value: "charging station id",
    type: "text",
    option: "required",
  },
  reservation_date: {
    value: "Date de reservation",
    type: "date",
    option: "required",
  },
  reservation_heure: {
    value: "Heure de reservation",
    type: "text",
    option: "required",
  },
  amount_paid: {
    value: "Montant à payer",
    type: "text",
    option: "required",
  },
};

export const newListing = {
  title: {
    value: "title",
    type: "text",
    option: "required",
  },
  description: {
    value: "description",
    type: "text",
    option: "required",
  },
  price: {
    value: "price/nigth",
    type: "number",
    option: "required",
  },
};
