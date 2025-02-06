const { Pool } = require("pg");

// const db = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT || 5432,
//   });

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // Enable SSL only in production
  });

console.log("DB connection established.");

db.connect()
  .then(() => console.log("Database connection established successfully."))
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit the process if the database connection fails
  });
module.exports = db;
