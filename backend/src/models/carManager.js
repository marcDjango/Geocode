// // Importing the AbstractManager class
const AbstractManager = require("./AbstractManager");

// Defining the CarManager class that extends AbstractManager
class CarManager extends AbstractManager {
  // Constructor initializes the class and sets the table name to "car"
  constructor() {
    // Calling the constructor of the parent class (AbstractManager) with the table name
    super({ table: "car" });
  }

  // Method to read a charging station record by its ID
  async read(id) {
    // Performing a database query to select a record with the given ID
    const [row] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    // Returning the first row (assuming there is only one result)
    return row[0];
  }

  // Method to read all charging station records
  async readAll() {
    // Performing a database query to select all records from the charging station table
    const [rows] = await this.database.query(`select * from ${this.table}`);
    // Returning all rows
    return rows;
  }

  // Method to edit/update a charging station record by ID
  async edit(body, id) {
    // Function to check if a value is an array and stringify it if necessary
    function isArray(data) {
      return Object.values(data).map((arr) =>
        Array.isArray(arr) ? JSON.stringify(arr) : arr
      );
    }

    // Converting values in the body to an array (stringifying arrays if present)
    const values = isArray(body);

    // Getting the keys (parameters) from the body
    const params = Object.keys(body);

    // Creating a string of parameters for the SQL SET clause
    const setParams = params.map((item) => `${item} = ?`).join(", ");

    // Performing a database query to update the record with the given ID
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET ${setParams} WHERE id = ?`,
      [...values, id]
    );

    // Returning the result of the update operation
    return rows;
  }

  // Method to add/insert a new charging station record
  async add(body) {
    // Function to check if a value is an array and stringify it if necessary
    function isArray(data) {
      return Object.values(data).map((arr) =>
        Array.isArray(arr) ? JSON.stringify(arr) : arr
      );
    }

    // Converting values in the body to an array (stringifying arrays if present)
    const values = isArray(body);

    // Getting the keys (parameters) from the body
    const params = Object.keys(body);

    // Creating a string of parameters for the SQL INSERT INTO clause
    const setParams = params.join(", ");

    // Creating a placeholder string for the values in the SQL query
    const placeholder = params.map(() => "? ").join(", ");

    // Performing a database query to insert a new record into the charging station table
    const [rows] = await this.database.query(
      `INSERT INTO ${this.table}(${setParams}) VALUES (${placeholder})`,
      [...values]
    );

    // Returning the result of the insert operation
    return rows;
  }

  // Method to delete a charging station record by its ID
  async delete(id) {
    // Performing a database query to delete a record with the given ID
    const [rows] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    // Returning the result of the delete operation
    return rows;
  }
}

// Exporting the CarManager class
module.exports = CarManager;
