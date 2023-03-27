import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

export default function EmployeeTable({
  employees,
  handleEditClick,
  handleDeleteClick,
}) {
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
              onClick={() => handleEditClick(row.original)}
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
              onClick={() => handleDeleteClick(row.values)}
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
  );
}
