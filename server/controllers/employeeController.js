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
    const existingEmployee = await sqlite.asyncQuery(
      "SELECT * FROM employees WHERE id = ?",
      [req.params.id]
    );

    if (existingEmployee.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (req.body.id !== req.params.id) {
      const IdTaken = await sqlite.asyncQuery(
        "SELECT * FROM employees WHERE id = ?",
        [req.body.id]
      );

      if (IdTaken.length > 0) {
        return res
          .status(400)
          .json({ message: "The new employee ID is already taken" });
      }
    }

    await sqlite.asyncQuery(
      "UPDATE employees SET id = ?, name = ?, code = ?, profession = ?, color = ?, branch = ?, city = ?, assigned = ? WHERE id = ?",
      [
        req.body.id || existingEmployee[0].id,
        req.body.name || existingEmployee[0].name,
        req.body.code || existingEmployee[0].code,
        req.body.profession || existingEmployee[0].profession,
        req.body.color || existingEmployee[0].color,
        req.body.branch || existingEmployee[0].branch,
        req.body.city || existingEmployee[0].city,
        req.body.assigned || existingEmployee[0].assigned,
        req.params.id,
      ]
    );
    const updatedEmployee = await sqlite.asyncQuery(
      "SELECT * FROM employees WHERE id = ?",
      [req.body.id || existingEmployee[0].id]
    );

    return res.status(200).json({
      message: "Employee successfully updated",
      employee: updatedEmployee[0],
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.employee_delete = async function (req, res, next) {
  try {
    const existingEmployee = await sqlite.asyncQuery(
      "SELECT * FROM employees WHERE id = ?",
      [req.params.id]
    );

    if (existingEmployee.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await sqlite.asyncQuery("DELETE FROM employees WHERE id = ?", [
      req.params.id,
    ]);

    return res.status(200).json({
      message: "Employee successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
