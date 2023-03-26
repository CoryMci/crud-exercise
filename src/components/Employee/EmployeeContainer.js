import useLoadEmployees from "../../hooks/useLoadEmployees";
import EmployeeList from "./EmployeeList";
import EmployeeForm from "./EmployeeForm/EmployeeForm";
import { useState } from "react";

export default function EmployeeContainer() {
  const [formVisibility, setFormVisibility] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const { employees, loading, refreshEmployees, crudError } =
    useLoadEmployees();

  return (
    <div className="">
      {formVisibility ? (
        <EmployeeForm
          setFormVisibility={setFormVisibility}
          refreshEmployees={refreshEmployees}
          editingEmployee={editingEmployee}
          setEditEmployee={setEditingEmployee}
        ></EmployeeForm>
      ) : (
        ""
      )}
      {loading ? (
        <div>Loading...</div>
      ) : crudError ? (
        <div>An error occured: {crudError.message}</div>
      ) : (
        <EmployeeList
          employees={employees}
          refreshEmployees={refreshEmployees}
          setEditingEmployee={setEditingEmployee}
          setFormVisibility={setFormVisibility}
        />
      )}
    </div>
  );
}
