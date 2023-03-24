import { useEffect, useState } from "react";
import { newEmployee, editEmployee } from "../lib/crud";

export default function EmployeeForm({
  refreshEmployees,
  setFormVisibility,
  editEmployee: editingEmployee,
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
      setFormData(editingEmployee);
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

  function validateForm(formData) {
    //using error obj instead of validationError to prevent multiple state changes
    const errors = {};

    const idPattern = /^\d{1,4}$/;
    if (!formData.id || !idPattern.test(formData.id)) {
      errors.id = "ID must be between 1 and 4 digits.";
    }

    const codePattern = /^[A-Z]\d{3}$/;
    if (!formData.code || !codePattern.test(formData.code)) {
      errors.code = "Code should be a capital letter followed by 3 digits.";
    }

    const wordPattern = /^[a-z A-Z]{3,25}$/;
    if (!formData.name || !wordPattern.test(formData.name)) {
      errors.name = "Name should be between 3 and 25 letters.";
    }

    if (!formData.profession || !wordPattern.test(formData.profession)) {
      errors.profession = "Profession should be between 3 and 25 letters.";
    }

    if (!formData.branch || !wordPattern.test(formData.branch)) {
      errors.branch = "Branch should be between 3 and 25 letters.";
    }

    if (!formData.city || !wordPattern.test(formData.city)) {
      errors.city = "City should be between 3 and 25 letters.";
    }

    return errors;
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
      if (editingEmployee) {
        await editEmployee(formData);
      } else {
        await newEmployee(formData);
      }
      handleCloseForm();
      refreshEmployees();
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
        <h1 className="text-lg font-bold mb-4">
          {editingEmployee ? "Edit Employee" : "New Employee"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col">
            <div className="flex mb-1 ml-1 text-xs font-semibold">
              <label htmlFor="id">ID</label>
              <div className="text-red-600 ml-8">{validationError.id}</div>
            </div>
            <input
              className="border border-slate-300 rounded w-full p-2"
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex mb-1 ml-1 text-xs font-semibold">
              <label htmlFor="name" className="mb-1 ml-1 text-xs font-semibold">
                Name
              </label>
              <div className="text-red-600 ml-8">{validationError.name}</div>
            </div>
            <input
              className="border border-slate-300 rounded w-full p-2"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex mb-1 ml-1 text-xs font-semibold">
              <label htmlFor="code">Code</label>
              <div className="text-red-600 ml-8">{validationError.code}</div>
            </div>
            <input
              className="border border-slate-300 rounded w-full p-2"
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex mb-1 ml-1 text-xs font-semibold">
              <label htmlFor="profession">Profession</label>
              <div className="text-red-600 ml-8">
                {validationError.profession}
              </div>
            </div>
            <input
              className="border border-slate-300 rounded w-full p-2"
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex mb-1 ml-1 text-xs font-semibold">
              <label htmlFor="branch">Branch</label>
              <div className="text-red-600 ml-8">{validationError.branch}</div>
            </div>
            <input
              className="border border-slate-300 rounded w-full p-2"
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex mb-1 ml-1 text-xs font-semibold">
              <label htmlFor="city">City</label>
              <div className="text-red-600 ml-8">{validationError.city}</div>
            </div>
            <input
              className="border border-slate-300 rounded w-full p-2"
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="color" className="mb-1 ml-1 text-xs font-semibold">
              Color
            </label>
            <input
              className="border border-slate-300 rounded w-10 h-10 p-2"
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInput}
            />
          </div>
          <label className="inline-flex items-center text-xs font-semibold">
            <input
              className="mr-2"
              type="checkbox"
              name="assigned"
              checked={formData.assigned}
              onChange={handleInput}
            />
            Assigned
          </label>
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
