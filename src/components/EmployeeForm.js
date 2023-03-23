import { useState } from "react";
import { newEmployee } from "../lib/crud";

export default function EmployeeForm() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    code: "",
    profession: "",
    color: "",
    branch: "",
    city: "",
    assigned: false,
  });

  const [validationError, setValidationError] = useState(null); //TODO add validation in handlechange fn

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, //to handle checkbox status
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      await newEmployee(formData);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="ID"
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="code"
        value={formData.code}
        onChange={handleChange}
        placeholder="Code"
      />
      <input
        type="text"
        name="profession"
        value={formData.profession}
        onChange={handleChange}
        placeholder="Profession"
      />
      <input
        type="text"
        name="color"
        value={formData.color}
        onChange={handleChange}
        placeholder="Color"
      />
      <input
        type="text"
        name="branch"
        value={formData.branch}
        onChange={handleChange}
        placeholder="Branch"
      />
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
      />
      <label>
        <input
          type="checkbox"
          name="assigned"
          checked={formData.assigned}
          onChange={handleChange}
        />
        Assigned
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
