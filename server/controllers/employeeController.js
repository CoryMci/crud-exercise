const Employee = require("../models/employee");
const sqlite = require("../lib/sqlite");

exports.employee_list = async function (req, res, next) {
  try {
    const employees = await sqlite.asyncQuery("SELECT * FROM employees");
    return res.status(200).json(employees);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.employee_create = async function (req, res, next) {
  try {
    const existingEmployee = await sqlite.asyncQuery(
      "SELECT * FROM employees WHERE id = ?",
      [req.body.id]
    );

    if (existingEmployee.length > 0) {
      return res
        .status(300)
        .json({ message: "Employee already exists with that id!" });
    }

    await sqlite.asyncQuery(
      "INSERT INTO employees (id, name, code, profession, color, branch, city, assigned) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        req.body.id,
        req.body.name,
        req.body.code,
        req.body.profession,
        req.body.color,
        req.body.branch,
        req.body.city,
        req.body.assigned,
      ]
    );

    return res.status(200).json({
      message: "Employee successfully created!",
      employee: req.body,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.employee_edit = async function (req, res, next) {
  try {
    const existingEmployee = await Employee.findOne({ id: req.params.id });

    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    existingEmployee.id = req.body.id || existingEmployee.id;
    existingEmployee.name = req.body.name || existingEmployee.name;
    existingEmployee.code = req.body.code || existingEmployee.code;
    existingEmployee.profession =
      req.body.profession || existingEmployee.profession;
    existingEmployee.color = req.body.color || existingEmployee.color;
    existingEmployee.branch = req.body.branch || existingEmployee.branch;
    existingEmployee.city = req.body.city || existingEmployee.city;
    existingEmployee.assigned = req.body.assigned || existingEmployee.assigned;

    const updatedEmployee = await existingEmployee.save();

    return res.status(200).json({
      message: "Employee successfully updated",
      Employee: updatedEmployee,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.employee_delete = async function (req, res, next) {
  try {
    const existingEmployee = await Employee.findOne({ id: req.params.id });

    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await existingEmployee.remove();

    return res.status(200).json({
      message: "Employee successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
