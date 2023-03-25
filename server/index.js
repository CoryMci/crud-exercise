const express = require("express");
const cors = require("cors");
const employeeRouter = require("./routes/employeeRoute");

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false })); // to allow URLencoded data

app.use("/api", employeeRouter);

app.listen(8080, () => console.log("Job Dispatch API running on port 8080!"));
