import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(morgan("dev"));

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
