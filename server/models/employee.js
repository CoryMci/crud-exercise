const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  profession: { type: String, required: true },
  color: { type: String, required: true },
  branch: { type: String, required: true },
  city: { type: String, required: true },
  assigned: { type: Boolean, required: true },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
