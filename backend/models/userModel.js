import db from "../config/db.js";
import bcrypt from "bcrypt";

var db_sequelize = db.Sequelize,
  User = db.define(
    "User",
    {
      id: {
        type: db_sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: db_sequelize.STRING,
      },
      password: {
        type: db_sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: db_sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      hooks: {
        beforeCreate: async function (User) {
          const salt = await bcrypt.genSaltSync(10);
          User.password = await bcrypt.hashSync(User.password, salt);
        },
      },
    }
  );


export default User;