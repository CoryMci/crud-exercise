const express = require("express");
const router = express.Router();

const employee_controller = require("../controllers/employeeController");

//GET request for employee list
router.get("/employees", employee_controller.employee_list);

module.exports = router;
