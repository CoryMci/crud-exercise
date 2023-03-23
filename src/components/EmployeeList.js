import Employee from "./Employee";

export default function EmployeeList({ employees }) {
  return (
    <div>
      <button className="bg-green-400 rounded">New Employee</button>
      <table className="bg-slate-200 border border-slate-700">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Code</th>
            <th>Profession</th>
            <th>Color</th>
            <th>City</th>
            <th>Branch</th>
            <th>Assigned</th>
          </tr>
          {employees.map((employee) => (
            <Employee key={employee.id} employee={employee}></Employee>
          ))}
        </tbody>
      </table>
    </div>
  );
}
