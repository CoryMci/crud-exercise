import { deleteEmployee } from "../lib/crud";
import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";

export default function EmployeeList({
  employees,
  refreshEmployees,
  setEditingEmployee,
  setFormVisibility,
}) {
  const handleDeleteEmployee = async function (employee) {
    try {
      await deleteEmployee(employee);
      refreshEmployees();
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
        accessor: (d) => (d.assigned ? "Yes" : "No"),
      },
      {
        id: "edit",
        Cell: ({ row }) => {
          return (
            <button
              className="bg-blue-400 text-white rounded w-20 py-1"
              onClick={() => handleEditEmployee(row.values)}
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

  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

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
        {
          // apply the table props
          ...getTableProps()
        }
      >
        <thead>
          {
            // FROM REACT-TABLE QUICKSTART DOCS
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr
                className="border border-slate-500"
                {...headerGroup.getHeaderGroupProps()}
              >
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th
                      className="p-2"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}{" "}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              //inline style used for dynamic css rendering
              const style = {
                boxShadow: `inset 10px 0px 0px ${row.original.color}`,
              };
              prepareRow(row);
              return (
                // Apply the row props
                <tr style={style} className="" {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props

                      return (
                        <td
                          className="p-2 pl-4 opacity-100"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}
