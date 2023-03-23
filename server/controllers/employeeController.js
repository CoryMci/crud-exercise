const Employee = require("../models/employee");

exports.employee_list = function (req, res, next) {
  Employee.find({}).exec(function (err, list) {
    if (err) {
      return next(err);
    }
    res.status(200);
    res.json(list);
  });
};
