export default function Employee({
  employee,
  deleteEmployee,
  refreshEmployees,
}) {
  const handleDeleteEmployee = async function () {
    try {
      await deleteEmployee(employee);
      await refreshEmployees();
    } catch (error) {
      console.log(error.message);
    }
  };

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
        <button className="bg-red-400 rounded" onClick={handleDeleteEmployee}>
          Delete
        </button>
      </td>
    </tr>
  );
}
