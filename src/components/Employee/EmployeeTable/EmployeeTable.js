import { deleteEmployee } from "../../../lib/crud";
import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

export default function EmployeeTable({
  employees,
  refreshEmployees,
  setEditingEmployee,
  setFormVisibility,
}) {
  const handleDeleteEmployee = async function (employee) {
    try {
      const response = await deleteEmployee(employee);
      refreshEmployees(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCreateEmployee = function () {
    setEditingEmployee(null);
    setFormVisibility(true);
  };

  const handleEditEmployee = function (employee) {
    setEditingEmployee(employee);
    setFormVisibility(true);
  };

  const data = useMemo(() => employees, [employees]);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Code",
        accessor: "code",
      },
      {
        Header: "Profession",
        accessor: "profession",
      },
      {
        Header: "Branch",
        accessor: "branch",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        id: "assigned",
        Header: "Assigned",
        // To display boolean value in cell
        accessor: (d) => (d.assigned === "true" ? "Yes" : "No"),
      },
      {
        id: "edit",
        Cell: ({ row }) => {
          return (
            <button
              className="bg-blue-400 text-white rounded w-20 py-1"
              onClick={() => handleEditEmployee(row.original)}
            >
              Edit
            </button>
          );
        },
      },
      {
        id: "delete",
        Cell: ({ row }) => {
          return (
            <button
              className="bg-red-400 text-white rounded w-20 py-1"
              onClick={() => handleDeleteEmployee(row.values)}
            >
              Delete
            </button>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <div className="flex flex-col gap-2 mx-auto pt-8 lg:w-5/6 overflow-auto">
      <div className="flex w-full">
        <h1 className="flex-grow font-semibold indent-2">Plexxis Employees</h1>
        <button
          className="bg-green-400 text-white rounded p-2 self-end mx-16"
          onClick={() => handleCreateEmployee()}
        >
          New Employee
        </button>
      </div>

      <table
        className="border border-slate-500 bg-white w-full shadow-md"
        {...getTableProps()}
      >
        <TableHeader headerGroups={headerGroups}></TableHeader>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => (
            <TableRow key={row.id} row={row} prepareRow={prepareRow}></TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
