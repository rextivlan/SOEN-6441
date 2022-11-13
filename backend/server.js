import colors from "colors";
import db from "./config/db.js";

import app from "./app.js";
// const app = require("./app");

const PORT = process.env.PORT || 8080;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
