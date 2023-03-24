import Employee from "./Employee";
import EmployeeForm from "./EmployeeForm";
import { deleteEmployee } from "../lib/crud";
import { useMemo } from "react";
import { useTable } from "react-table";

export default function EmployeeList({ employees, refreshEmployees }) {
  const handleDeleteEmployee = async function (employeeId) {
    try {
      await deleteEmployee(employeeId);
      await refreshEmployees();
    } catch (error) {
      console.log(error.message);
    }
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
        Header: "Color",
        accessor: "color",
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
        Header: "Assigned",
        accessor: "assigned",
      },
      {
        id: "delete",
        Cell: ({ row }) => {
          return (
            <button
              className="bg-red-400 rounded"
              onClick={() => handleDeleteEmployee(row.values.id)}
            >
              Delete
            </button>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <EmployeeForm refreshEmployees={refreshEmployees}></EmployeeForm>
      <table
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
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
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
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
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
