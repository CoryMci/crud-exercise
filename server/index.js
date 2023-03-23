const express = require("express");
const cors = require("cors");
const employees = require("./data/employees.json");
const employeeRouter = require("./routes/employeeRoute");
require("dotenv").config();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

//set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = process.env.URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false })); // to allow URLencoded data

app.use("/api", employeeRouter);

// app.get("/api/employees", (req, res, next) => {
//   console.log("/api/employees");
//   res.setHeader("Content-Type", "application/json");
//   res.status(200);
//   res.send(JSON.stringify(employees, null, 2));
// });

app.listen(8080, () => console.log("Job Dispatch API running on port 8080!"));
