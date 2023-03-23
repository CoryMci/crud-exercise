const express = require("express");
const router = express.Router();

const employee_controller = require("../controllers/employeeController");

//GET request for employee list
router.get("/employees", employee_controller.employee_list);

//POST request for new employee
router.post("/employees", employee_controller.employee_create);

module.exports = router;
