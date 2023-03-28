import useLoadEmployees from "../../hooks/useLoadEmployees";
import EmployeeTable from "./EmployeeTable/EmployeeTable";
import EmployeeForm from "./EmployeeForm/EmployeeForm";
import { useState } from "react";
import { deleteEmployee } from "../../lib/crud";
import Modal from "../reusable/Modal";

export default function EmployeeContainer() {
  const [formVisibility, setFormVisibility] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const { employees, loading, refreshEmployees, crudError } =
    useLoadEmployees();

  const handleDeleteClick = async function (employee) {
    try {
      const response = await deleteEmployee(employee);
      refreshEmployees(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCreateClick = function () {
    setEditingEmployee(null);
    setFormVisibility(true);
  };

  const handleEditClick = function (employee) {
    setEditingEmployee(employee);
    setFormVisibility(true);
  };

  const handleCloseForm = function () {
    setFormVisibility(false);
  };

  return (
    <>
      {formVisibility && (
        <Modal close={handleCloseForm}>
          <EmployeeForm
            refreshEmployees={refreshEmployees}
            editingEmployee={editingEmployee}
            handleCloseForm={handleCloseForm}
          />
        </Modal>
      )}
      <div className="flex flex-col gap-2 mx-auto pt-8 lg:w-5/6 overflow-auto">
        <div className="flex w-full">
          <h1 className="flex-grow text-2xl font-semibold indent-2">
            Plexxis Employees
          </h1>
          <button
            className="bg-green-400 text-white rounded p-2 self-end mx-16"
            onClick={() => handleCreateClick()}
          >
            New Employee
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : crudError ? (
          <div>An error occured: {crudError.message}</div>
        ) : (
          <EmployeeTable
            employees={employees}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        )}
      </div>
    </>
  );
}
