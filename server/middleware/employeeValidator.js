const { body } = require("express-validator");

exports.employeeValidationRules = function () {
  return [
    body("id")
      .notEmpty()
      .trim()
      .isInt({ min: 1, max: 9999 })
      .withMessage("id must be a number with 1 to 4 digits"),

    body("name")
      .notEmpty()
      .trim()
      .isLength({ min: 3, max: 25 })
      .matches(/^[a-zA-Z\s]*$/)
      .withMessage("name must be between 3 and 25 letters"),

    body("code")
      .notEmpty()
      .trim()
      .matches(/^[A-Z]\d{3}$/)
      .withMessage("code should be a capital letter followed by 3 digits"),

    body("profession")
      .notEmpty()
      .trim()
      .isLength({ min: 3, max: 25 })
      .matches(/^[a-zA-Z\s]*$/)
      .withMessage("profession must be between 3 and 25 letters"),

    body("color")
      .notEmpty()
      .isHexColor()
      .withMessage("color must be a hexadecimal color"),

    body("branch")
      .notEmpty()
      .trim()
      .isLength({ min: 3, max: 25 })
      .matches(/^[a-zA-Z\s]*$/)
      .withMessage("branch must be between 3 and 25 letters"),

    body("city")
      .notEmpty()
      .trim()
      .isLength({ min: 3, max: 25 })
      .matches(/^[a-zA-Z\s]*$/)
      .withMessage("city must be between 3 and 25 letters"),

    body("assigned")
      .notEmpty()
      .isBoolean()
      .withMessage("assigned must be a boolean"),
  ];
};
