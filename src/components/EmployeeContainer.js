import useLoadEmployees from "../hooks/useLoadEmployees";
import EmployeeList from "./EmployeeList";
import EmployeeForm from "./EmployeeForm";
import { useState } from "react";

export default function EmployeeContainer() {
  const [formVisibility, setFormVisibility] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const { employees, loading, refreshEmployees, crudError } =
    useLoadEmployees();

  return (
    <div>
      {formVisibility ? (
        <EmployeeForm
          setFormVisibility={setFormVisibility}
          refreshEmployees={refreshEmployees}
          editEmployee={editEmployee}
          setEditEmployee={setEditEmployee}
        ></EmployeeForm>
      ) : (
        ""
      )}
      <h1>Plexxis Employees</h1>
      {loading ? (
        <div>Loading...</div>
      ) : crudError ? (
        <div>An error occured: {crudError.message}</div>
      ) : (
        <EmployeeList
          employees={employees}
          refreshEmployees={refreshEmployees}
          setEditEmployee={setEditEmployee}
          setFormVisibility={setFormVisibility}
        />
      )}
    </div>
  );
}
