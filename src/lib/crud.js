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

export async function deleteEmployee(employee) {
  try {
    const response = await connection.delete(`/employees/${employee.id}`);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function editEmployee(employeeId, updatedEmployee) {
  try {
    const employeeInfo = new URLSearchParams({
      id: updatedEmployee.id,
      name: updatedEmployee.name,
      code: updatedEmployee.code,
      profession: updatedEmployee.profession,
      color: updatedEmployee.color,
      branch: updatedEmployee.branch,
      city: updatedEmployee.city,
      assigned: updatedEmployee.assigned,
    });
    const response = await connection.put(
      `/employees/${employeeId}`,
      employeeInfo
    );
    return response;
  } catch (err) {
    throw err;
  }
}
