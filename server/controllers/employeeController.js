const sqlite = require("../lib/sqlite");
const { validationResult } = require("express-validator");
const { employeeValidationRules } = require("../middleware/employeeValidator");

exports.employee_list = async function (req, res, next) {
  try {
    const employees = await sqlite.asyncQuery("SELECT * FROM employees");
    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({ errors: [error.message] });
  }
};

exports.employee_create = [
  //express-validator validation chaining.
  ...employeeValidationRules(),

  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const existingEmployee = await sqlite.asyncQuery(
        "SELECT * FROM employees WHERE id = ?",
        [req.body.id]
      );

      if (existingEmployee.length > 0) {
        return res
          .status(400)
          .json({ errors: ["Employee already exists with that id!"] });
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
      return res.status(500).json({ errors: [error.message] });
    }
  },
];

exports.employee_edit = [
  ...employeeValidationRules(),

  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const existingEmployee = await sqlite.asyncQuery(
        "SELECT * FROM employees WHERE id = ?",
        [req.params.id]
      );

      if (existingEmployee.length === 0) {
        return res.status(404).json({ errors: ["Employee not found"] });
      }

      if (req.body.id !== req.params.id) {
        const idTaken = await sqlite.asyncQuery(
          "SELECT * FROM employees WHERE id = ?",
          [req.body.id]
        );

        if (idTaken.length > 0) {
          return res
            .status(400)
            .json({ errors: ["Employee already exists with that id!"] });
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
      return res.status(500).json({ errors: [error.message] });
    }
  },
];

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
    return res.status(500).json({ errors: [error.message] });
  }
};
