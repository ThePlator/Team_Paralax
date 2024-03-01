import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import teacherRoute from "./routes/teacherRoute.js";
import classRoute from "./routes/classRoute.js";
import subjectRoute from "./routes/subjectRoute.js";
import routineRoute from "./routes/routine.js";

import cors from "cors";
// configure env
dotenv.config();

// database config
connectDB();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/teacher", teacherRoute);
app.use("/api/v1/class", classRoute);
app.use("/api/v1/subject", subjectRoute);
app.use("/api/v1/routine", routineRoute);

// rest api
app.get("/", (req, res) => {
  res.send(`<h1>welcome to pce purnea</h1>`);
});

// RUN LISTEN
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`.bgCyan.white);
});
