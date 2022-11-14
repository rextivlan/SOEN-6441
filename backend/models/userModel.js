import sql from "../config/db.js";

class User {
  // User Constructor
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  }
  static async create(name, email, password) {
    let [users, _] = await sql
      .promise()
      .query(
        `INSERT INTO users (name, password, email) VALUES ('${name}', '${password}', '${email}');`
      );
    return users;
  }
  static async getAll() {
    let [users, _] = await sql.promise().query("SELECT * FROM users");
    return users;
  }
  // Get a specific user
  static async getByEmail(email) {
    let [users, _] = await sql
      .promise()
      .query(`SELECT * FROM users WHERE email like '${email}'`);
    return users;
  }
  // Get user by email and password
  static async getByEmailAndPassword(email, password) {
    let [user, _] = await sql
      .promise()
      .query(
        `SELECT * FROM users WHERE email like '${email}' AND password like'${password}'`
      );
    return user;
  }
}

export default User;
