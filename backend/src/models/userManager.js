// Importing the AbstractManager class
const AbstractManager = require("./AbstractManager");

// Defining the UserManager class that extends AbstractManager
class UserManager extends AbstractManager {
  // Constructor initializes the class and sets the table name to "charging_station"
  constructor() {
    // Calling the constructor of the parent class (AbstractManager) with the table name
    super({ table: "user" });
  }

  async readAllUser() {
    // Performing a database query to select all records from the charging station table
    const [rows] = await this.database.query(
      `select id , name, firstname, email, gender, DATE_FORMAT(date_of_birth, '%Y-%m-%d') AS date_of_birth , postal_code, city, number_vehicles, profil_image, is_admin from ${this.table}`
    );
    // Returning all rows
    return rows;
  }

  async readUser(id) {
    // Performing a database query to select a record with the given ID
    const [row] = await this.database.query(
      `select id , name, firstname, email, gender, DATE_FORMAT(date_of_birth, '%Y-%m-%d') AS date_of_birth , postal_code, city, number_vehicles, hashed_password, profil_image, is_admin from ${this.table} where id = ?`,
      [id]
    );
    // Returning the first row (assuming there is only one result)
    return row[0];
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return rows[0];
  }
}

// Exporting the UserManager class
module.exports = UserManager;
