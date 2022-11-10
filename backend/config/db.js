import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Establish the MySQL connection
db.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default db;
