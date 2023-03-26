export default function TableRow({ row, prepareRow }) {
  const style = {
    //inline style used for dynamic css rendering.
    boxShadow: `inset 10px 0px 0px ${row.original.color}`,
  };
  prepareRow(row);

  return (
    <tr style={style} {...row.getRowProps()}>
      {row.cells.map((cell) => (
        <td className="p-2 pl-4 opacity-100" {...cell.getCellProps()}>
          {cell.render("Cell")}
        </td>
      ))}
    </tr>
  );
}
