const memoryTables = {
  table1: [{ id: 1, name: "John" }],
  table2: [
    { id: 1, name: "Mike" },
    { id: 2, name: "Alice" },
  ],
  table3: [{ id: 1, name: "David" }],
};
async function executeActionInDb(action) {

    switch (action) {
      case "1":
        memoryTables.table1.push({ id: Date.now(), name: "New User" });
        break;
      case "2":
        memoryTables.table2.pop();
        break;
      case "3":
        memoryTables.table3 = memoryTables.table3.map((row) =>
          row.id === 1 ? { ...row, name: "Updated User" } : row
        );
        break;
      default:
        throw new Error("Unsupported action");
    }

    return memoryTables; 
}

function getInMemoryTables() {
  return memoryTables;
}

module.exports = {
  executeActionInDb,
  getInMemoryTables,
};
