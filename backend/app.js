import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import youtubeVideoRoutes from "./routes/youtubeVideoRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(morgan("dev"));

app.use(cors());

app.use(express.json({ extended: false }));

app.use("/users", userRoutes);

app.use("/youtubevideos", youtubeVideoRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(notFound);
app.use(errorHandler);

// module.exports = app;
export default app;
