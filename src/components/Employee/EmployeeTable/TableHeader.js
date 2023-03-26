import React from "react";

export default function TableHeader({ headerGroups }) {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr
          className="border border-slate-500"
          {...headerGroup.getHeaderGroupProps()}
        >
          {headerGroup.headers.map((column) => (
            <th
              className="p-2"
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              {column.render("Header")}{" "}
              <span>
                {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
              </span>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
