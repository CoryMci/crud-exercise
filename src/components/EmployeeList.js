import Employee from "./Employee";

export default function EmployeeList({ employees }) {
  return employees.map((employee) => (
    <Employee key={employee.id} employee={employee}></Employee>
  ));
}
