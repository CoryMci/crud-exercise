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
    color: "",
    branch: "",
    city: "",
    assigned: false,
  };

  const [formData, setFormData] = useState(emptyForm);
  const [validationError, setValidationError] = useState(null); //TODO add validation in handlechange fn

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
    setFormData({
      id: "",
      name: "",
      code: "",
      profession: "",
      color: "",
      branch: "",
      city: "",
      assigned: false,
    });
    setFormVisibility(false);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, //to handle checkbox status
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

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
  console.log(formData);
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
            <label htmlFor="id" className="mb-1 ml-1 text-sm font-semibold">
              ID
            </label>
            <input
              className="border border-slate-300 rounded w-full p-2"
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 ml-1 text-sm font-semibold">
              Name
            </label>
            <input
              className="border border-slate-300 rounded w-full p-2"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="code" className="mb-1 ml-1 text-sm font-semibold">
              Code
            </label>
            <input
              className="border border-slate-300 rounded w-full p-2"
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="profession"
              className="mb-1 ml-1 text-sm font-semibold"
            >
              Profession
            </label>
            <input
              className="border border-slate-300 rounded w-full p-2"
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="branch" className="mb-1 ml-1 text-sm font-semibold">
              Branch
            </label>
            <input
              className="border border-slate-300 rounded w-full p-2"
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="mb-1 ml-1 text-sm font-semibold">
              City
            </label>
            <input
              className="border border-slate-300 rounded w-full p-2"
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="color" className="mb-1 ml-1 text-sm font-semibold">
              Color
            </label>
            <input
              className="border border-slate-300 rounded w-10 h-10 p-2"
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>
          <label className="inline-flex items-center">
            <input
              className="mr-2"
              type="checkbox"
              name="assigned"
              checked={formData.assigned}
              onChange={handleChange}
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
