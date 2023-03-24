import axios from "axios";

const connection = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export async function loadEmployees() {
  try {
    const response = await connection.get("/employees");
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function newEmployee(employee) {
  try {
    const employeeInfo = new URLSearchParams({
      id: employee.id,
      name: employee.name,
      code: employee.code,
      profession: employee.profession,
      color: employee.color,
      branch: employee.branch,
      city: employee.city,
      assigned: employee.assigned,
    });

    const response = await connection.post("/employees/", employeeInfo);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function deleteEmployee(employeeId) {
  try {
    const response = await connection.delete(`/employees/${employeeId}`);
    return response;
  } catch (err) {
    throw err;
  }
}
