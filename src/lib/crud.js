import axios from "axios";

export async function loadEmployees() {
  const connection = axios.create({
    baseURL: "http://localhost:8080/api/",
    timeout: 5000,
  });

  try {
    const response = await connection.get("/employees");
    return response.data;
  } catch (err) {
    throw err;
  }
}
