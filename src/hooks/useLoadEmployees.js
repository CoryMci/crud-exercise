import { loadEmployees } from "../lib/crud";
import { useState, useEffect } from "react";

export default function useLoadEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [crudError, setCrudError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const employees = await loadEmployees();
        setEmployees(employees);
      } catch (err) {
        setCrudError(err);
      } finally {
        setLoading(false);
      }
    })(); //immediately invoked async function to prevent returning a promise to the useEffect hook.
  }, [refresh]);

  return { employees, loading, refresh, setRefresh, crudError };
}
