// // Importing the AbstractManager class
const AbstractManager = require("./AbstractManager");

// Defining the ReservaManager class that extends AbstractManager
class ReservaManager extends AbstractManager {
  // Constructor initializes the class and sets the table name to "reservation"
  constructor() {
    // Calling the constructor of the parent class (AbstractManager) with the table name
    super({ table: "user_has_charging_station" });
  }
}
module.exports = ReservaManager;
