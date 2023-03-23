export default function Employee({ employee }) {
  return (
    <tr>
      {Object.keys(employee).map((key) => {
        if (key === "_id") {
          //prevent loading mongoID from database
          return;
        }
        return <td key={key}>{employee[key]}</td>;
      })}
      <td>
        <button className="bg-blue-400 rounded">Edit</button>
      </td>
      <td>
        <button className="bg-red-400 rounded">Delete</button>
      </td>
    </tr>
  );
}
