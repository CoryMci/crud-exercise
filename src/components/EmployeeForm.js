import { useState } from "react";
import { newEmployee } from "../lib/crud";

export default function EmployeeForm({ refreshEmployees, setFormVisibility }) {
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

  function handleCloseForm(e) {
    //prevents clicks from affecting elements outside of form
    e.stopPropagation();
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
      await newEmployee(formData);
      refreshEmployees();
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  }

  return (
    <div
      className="fixed w-screen h-screen z-50 bg-black bg-opacity-30 flex items-center justify-center"
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
        <h1 className="text-lg font-bold mb-4">New Employee</h1>

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
            <label htmlFor="color" className="mb-1 ml-1 text-sm font-semibold">
              Color
            </label>
            <input
              className="border border-slate-300 rounded w-full p-2"
              type="text"
              id="color"
              name="color"
              value={formData.color}
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
