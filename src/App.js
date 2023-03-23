import React from "react";
import useLoadEmployees from "./hooks/useLoadEmployees";
import EmployeeList from "./components/EmployeeList";

export default function App() {
  const { employees, loading, refreshEmployees, crudError } =
    useLoadEmployees();

  return (
    <div className="App">
      <h1>Plexxis Employees</h1>

      {loading ? (
        <div>Loading...</div>
      ) : crudError ? (
        <div>An error occured: {crudError.message}</div>
      ) : (
        <EmployeeList
          employees={employees}
          refreshEmployees={refreshEmployees}
        />
      )}
    </div>
  );
}
