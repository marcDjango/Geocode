const charginStationKeys = [
  "nom_operateur",
  "telephone_operateur",
  "nom_enseigne",
  "implantation_station",
  "adresse_station",
  "coordonneesXY",
  "nbre_pdc",
  "puissance_nominale",
  "prise_type_ef",
  "prise_type_2",
  "prise_type_combo_ccs",
  "prise_type_chademo",
  "prise_type_autre",
  "tarification",
  "condition_acces",
  "reservation",
  "horaires",
  "accessibilite_pmr",
  "restriction_gabarit",
  "consolidated_longitude",
  "consolidated_latitude",
];

const chargingStationToCreate = {
  nom_operateur: "ELECTRIC 55 CHARGING",
  telephone_operateur: "33975891501",
  nom_enseigne: "ELECTRIC 55 CHARGING",
  implantation_station: "Voirie",
  adresse_station: "1 Avenue Victor Basch 84300 Cavaillon",
  coordonneesXY: [5.042062, 43.836565],
  nbre_pdc: 1,
  puissance_nominale: 22,
  prise_type_ef: "TRUE",
  prise_type_2: "TRUE",
  prise_type_combo_ccs: "FALSE",
  prise_type_chademo: "FALSE",
  prise_type_autre: "FALSE",
  tarification: "",
  condition_acces: "AccÃ¨s rÃ©servÃ©",
  reservation: "TRUE",
  horaires: "24/7",
  accessibilite_pmr: "Accessible mais non rÃ©servÃ© PMR",
  restriction_gabarit: "15mÂ²",
  consolidated_longitude: 5.042062,
  consolidated_latitude: 43.836565,
};
const chargingStationUpdateData = {
  nom_operateur: "ELECTRIC 55 CHARGING",
  telephone_operateur: "33975891501",
  nom_enseigne: "ELECTRIC 55 CHARGING",
  implantation_station: "Voirie",
  adresse_station: "1 Avenue Victor Basch 84300 Cavaillon",
  coordonneesXY: [5.042062, 43.836565],
  nbre_pdc: 1,
  puissance_nominale: 22,
  prise_type_ef: "FALSE",
  prise_type_2: "FALSE",
  prise_type_combo_ccs: "FALSE",
  prise_type_chademo: "FALSE",
  prise_type_autre: "FALSE",
  tarification: "",
  condition_acces: "AccÃ¨s rÃ©servÃ©",
  reservation: "TRUE",
  horaires: "24/7",
  accessibilite_pmr: "Accessible mais non rÃ©servÃ© PMR",
  restriction_gabarit: "15mÂ²",
  consolidated_longitude: 5.042062,
  consolidated_latitude: 43.836565,
};
// *****************************************************************************

const carCreate = {
  car_image: "immage-test-create",
  user_id: 1,
  brand_id: 1,
  plug_id: 1,
};
const carUpdate = {
  car_image: "immage-test-update",
  user_id: 2,
  brand_id: 2,
  plug_id: 2,
};
const carKeys = ["id", "car_image", "user_id", "brand_id", "plug_id"];
// *****************************************************************************

const reservationCreate = {
  user_id: 1,
  charging_station_id: 1,
  reservation_date: "2023-12-20",
  amount_paid: "5.70",
};
const reservationUpdate = {
  user_id: 2,
  charging_station_id: 2,
  reservation_date: "2024-01-20",
  amount_paid: "6.64",
};
const reservationKeys = [
  "id",
  "user_id",
  "charging_station_id",
  "reservation_date",
  "amount_paid",
];
// *****************************************************************************
const userCreate = {
  name: "bob",
  firstname: "herman",
  email: "wXnJt@example.com",
  gender: "male",
  date_of_birth: "1997-01-01",
  postal_code: "75000",
  city: "paris",
  number_vehicles: 1,
  password: "123456",
  profil_image:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  role: 1,
};
const userUpdate = {
  name: "bob",
  firstname: "herman",
  email: "wXnJt@example.com",
  gender: "male",
  date_of_birth: "1997-01-01",
  postal_code: "31000",
  city: "toulouse",
  number_vehicles: 2,
  password: "123456",
  profil_image:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  role: 0,
};
const userKeys = [
  "id",
  "name",
  "firstname",
  "email",
  "gender",
  "date_of_birth",
  "postal_code",
  "city",
  "number_vehicles",
  "password",
  "profil_image",
  "role",
];

module.exports = {
  charginStationKeys,
  chargingStationToCreate,
  chargingStationUpdateData,

  carCreate,
  carUpdate,
  carKeys,

  reservationCreate,
  reservationUpdate,
  reservationKeys,

  userCreate,
  userUpdate,
  userKeys,
};
