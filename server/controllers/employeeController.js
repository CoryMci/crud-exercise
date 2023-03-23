const Employee = require("../models/employee");

exports.employee_list = async function (req, res, next) {
  try {
    const employees = await Employee.find({});
    return res.status(200).json(employees);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.employee_create = async function (req, res, next) {
  try {
    const existingEmployee = await Employee.findOne({ id: req.body.id });

    if (existingEmployee) {
      return res
        .status(300)
        .json({ message: "Employee already exists with that id!" });
    }

    const employee = new Employee({
      id: req.body.id,
      name: req.body.name,
      code: req.body.code,
      profession: req.body.profession,
      color: req.body.color,
      branch: req.body.branch,
      city: req.body.city,
      assigned: req.body.assigned,
    });
    await employee.save();
    return res
      .status(200)
      .json({ message: "Employee successfully created!", employee: employee });
  } catch (error) {
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
