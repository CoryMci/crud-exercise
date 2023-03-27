import { useEffect, useState } from "react";
import { newEmployee, editEmployee } from "../../../lib/crud";
import validateForm from "./helpers/validateForm";
import Checkbox from "./Checkbox";
import ColorField from "./ColorField";
import TextInputField from "./TextInputField";

export default function EmployeeForm({
  refreshEmployees,
  setFormVisibility,
  editingEmployee,
}) {
  const emptyForm = {
    id: "",
    name: "",
    code: "",
    profession: "",
    color: "#000000",
    branch: "",
    city: "",
    assigned: false,
  };

  const [formData, setFormData] = useState(emptyForm);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    //effect used to update form data with employee data
    if (editingEmployee) {
      setFormData({
        ...editingEmployee,
        assigned: editingEmployee.assigned === "true" ? true : false, // convert string boolean
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingEmployee]);

  function handleCloseForm(e) {
    if (e) {
      //prevents clicks from affecting elements outside of form
      e.stopPropagation();
      //https://github.com/facebook/react/issues/3907#issuecomment-363948471
      // prevents Enter key from closing form
      if (e.detail === 0) {
        e.preventDefault();
        handleSubmit(e);
        return;
      }
    }

    //reset form data
    setFormData(emptyForm);
    setFormVisibility(false);
  }

  function handleInput(e) {
    const { name, value, type, checked } = e.target;
    //seperate object so we can refer to up-to-date data
    const currentData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value, //to handle checkbox status
    };

    setFormData(currentData);

    //if there are existing errors, check validation on each input.
    const errors = validateForm(currentData);
    if (Object.keys(validationError).length > 0) {
      setValidationError(errors);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    //validation
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
      console.log(error);
      console.log(error.message);
    }
  }
  return (
    <div
      className="fixed w-screen h-screen z-50 bg-black bg-opacity-30 shadow-md flex items-center justify-center"
      onClick={handleCloseForm}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-lg"
        onClick={
          // Prevents closing when clicking anywhere within the form
          (e) => {
            e.stopPropagation();
          }
        }
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
              onClick={handleCloseForm}
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
      </div>
    </div>
  );
}
