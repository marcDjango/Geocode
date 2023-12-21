// Function to check if a value is an array and stringify it if necessary
const isArray = (data) => {
  return Object.values(data).map((arr) =>
    Array.isArray(arr) ? JSON.stringify(arr) : arr
  );
};

module.exports = { isArray };
