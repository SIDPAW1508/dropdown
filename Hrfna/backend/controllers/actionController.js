const { getTablesFromDb, executeActionInDb, getInMemoryTables } = require("../config/db");

async function getTables() {
  return (await getTablesFromDb()) || getInMemoryTables();
}

async function performAction(action) {
  return executeActionInDb(action);
}

module.exports = {
  getTables,
  performAction,
};
