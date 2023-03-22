import React from "react";
import useLoadEmployees from "./hooks/useLoadEmployees";

export default function App() {
  const { employees, loading, refresh, setRefresh, crudError } =
    useLoadEmployees();

  return (
    <div className="App">
      <h1>Plexxis Employees</h1>

      {loading ? (
        <div>Loading...</div>
      ) : crudError ? (
        <div>An error occured: {crudError.message}</div>
      ) : (
        employees.map((employee) => (
          <div key={employee.id}>
            {Object.keys(employee).map((key) => (
              <span key={key}>
                {key}:{employee[key]}
              </span>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
