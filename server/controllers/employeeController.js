const Employee = require("../models/employee");

exports.employee_list = function (req, res, next) {
  Employee.find({}).exec(function (err, list) {
    if (err) {
      return next(err);
    }
    res.status(200);
    console.log(list);
    res.json(list);
  });
};

exports.employee_create = function (req, res, next) {
  const employee = new Employee({
    id: req.body.id,
    name: req.body.name,
    code: req.body.code,
    profession: req.body.profession,
    color: req.body.color,
    branch: req.body.branch,
    city: req.body.city,
  });

  // Check if Employee with same ID exists in database.
  Employee.findOne({
    id: req.body.id,
  }).exec((err, existing_employee) => {
    if (err) {
      return next(err);
    }

    if (existing_employee) {
      res
        .status(300)
        .json({ message: "Employee already exists with that id!" });
    } else {
      employee.save((err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ message: "success" });
      });
    }
  });
};
