import { useState } from "react";
import { newEmployee, editEmployee } from "../../../lib/crud";
import validateForm from "./helpers/validateForm";
import { emptyForm } from "./helpers/emptyForm";
import Checkbox from "./Checkbox";
import ColorField from "./ColorField";
import TextInputField from "./TextInputField";

export default function EmployeeForm({
  refreshEmployees,
  editingEmployee,
  handleCloseForm,
}) {
  const initialForm = editingEmployee
    ? {
        ...editingEmployee,
        assigned: editingEmployee.assigned === "true" ? true : false, // convert string boolean
      }
    : emptyForm;

  const [formData, setFormData] = useState(initialForm);
  const [validationError, setValidationError] = useState({});

  function handleInput(e) {
    const { name, value, type, checked } = e.target;
    const currentData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value, //to handle checkbox status
    };
    //IF validation errors already exist, update errors on each input
    if (Object.keys(validationError).length > 0) {
      const errors = validateForm(currentData);
      setValidationError(errors);
    }

    setFormData(currentData);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }
    try {
      let response;
      if (editingEmployee) {
        response = await editEmployee(editingEmployee.id, formData);
      } else {
        response = await newEmployee(formData);
      }
      handleCloseForm();
      refreshEmployees(response);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-h-screen overflow-auto"
    >
      <h1 className="text-lg font-bold mb-4">
        {editingEmployee ? "Edit Employee" : "New Employee"}
      </h1>
      <TextInputField
        id="id"
        label="ID"
        value={formData.id}
        error={validationError.id}
        onChange={handleInput}
      />
      <TextInputField
        id="name"
        label="Name"
        value={formData.name}
        error={validationError.name}
        onChange={handleInput}
      />
      <TextInputField
        id="code"
        label="Code"
        value={formData.code}
        error={validationError.code}
        onChange={handleInput}
      />
      <TextInputField
        id="profession"
        label="Profession"
        value={formData.profession}
        error={validationError.profession}
        onChange={handleInput}
      />
      <TextInputField
        id="branch"
        label="Branch"
        value={formData.branch}
        error={validationError.branch}
        onChange={handleInput}
      />
      <TextInputField
        id="city"
        label="City"
        value={formData.city}
        error={validationError.city}
        onChange={handleInput}
      />
      <div className="flex gap-8">
        <ColorField
          id="color"
          label="Color"
          value={formData.color}
          onChange={handleInput}
        />
        <Checkbox
          id="assigned"
          label="Assigned"
          value={formData.assigned}
          onChange={handleInput}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            if (e.detail === 0) {
              //prevents enter key from causing click
              return;
            }
            handleCloseForm();
          }}
          className="bg-slate-400 text-white rounded flex-grow py-2"
        >
          Cancel
        </button>
        <button
          className="bg-blue-400 text-white rounded flex-grow py-2"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}
