import sql from "../config/db.js";
import bcrypt from "bcrypt";

// constructor
const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
};

User.create = async (name, email, password) => {
  let [users, _] = await sql
    .promise()
    .query(
      `INSERT INTO users (name, password, email) VALUES ('${name}', '${password}', '${email}');`
    );
  return users;
};

User.getAll = async () => {
  let [users, _] = await sql.promise().query("SELECT * FROM users");
  return users;
};

// Get a specific user
User.getByEmail = async (email) => {
  let [users, _] = await sql
    .promise()
    .query(`SELECT * FROM users WHERE email like '${email}'`);
  return users;
};

// Get user by email and password
User.getByEmailAndPassword = async (email, password) => {
  let [user, _] = await sql
    .promise()
    .query(
      `SELECT * FROM users WHERE email like '${email}' AND password like'${password}'`
    );
  return user;
};

export default User;
