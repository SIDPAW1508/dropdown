import { useEffect, useState } from "react";
import DropdownAction from "./components/DropdownAction";
import DataTable from "./components/DataTable";
import { getTables, performAction } from "./services/api";

function App() {
  const [tables, setTables] = useState({
    table1: [],
    table2: [],
    table3: [],
  });

  const loadTables = async () => {
    try {
      const response = await getTables();
      setTables(response.data);
    } catch (error) {
      console.error("Failed to load tables", error);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);

  const handleAction = async (action) => {
    try {
      await performAction(action);
      await loadTables();
    } catch (error) {
      console.error("Failed to execute action", error);
    }
  };

  return (
    <div>
      <h1>Dropdown CRUD App</h1>

      <DropdownAction onExecute={handleAction} />

      <DataTable title="Table 1" data={tables.table1} />
      <DataTable title="Table 2" data={tables.table2} />
      <DataTable title="Table 3" data={tables.table3} />
    </div>
  );
}

export default App;