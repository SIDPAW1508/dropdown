const mysql = require("mysql2/promise");

const connectionConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "dropdown_app",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
};

let pool;
let useFallback = false;

const memoryTables = {
  table1: [{ id: 1, name: "John" }],
  table2: [
    { id: 1, name: "Mike" },
    { id: 2, name: "Alice" },
  ],
  table3: [{ id: 1, name: "David" }],
};

function cloneTables(tables) {
  return {
    table1: tables.table1.map((row) => ({ ...row })),
    table2: tables.table2.map((row) => ({ ...row })),
    table3: tables.table3.map((row) => ({ ...row })),
  };
}

async function getPool() {
  if (!pool) {
    pool = mysql.createPool(connectionConfig);

    try {
      await pool.query("SELECT 1");
      useFallback = false;
    } catch (error) {
      useFallback = true;
      console.warn("MySQL is unavailable; using in-memory data.", error.message);
    }
  }

  return pool;
}

async function getTablesFromDb() {
  const dbPool = await getPool();

  if (useFallback) {
    return null;
  }

  try {
    const [table1Rows] = await dbPool.query("SELECT id, name FROM table1 ORDER BY id");
    const [table2Rows] = await dbPool.query("SELECT id, name FROM table2 ORDER BY id");
    const [table3Rows] = await dbPool.query("SELECT id, name FROM table3 ORDER BY id");

    return {
      table1: table1Rows,
      table2: table2Rows,
      table3: table3Rows,
    };
  } catch (error) {
    useFallback = true;
    console.warn("Falling back to in-memory data.", error.message);
    return null;
  }
}

async function executeActionInDb(action) {
  const dbPool = await getPool();

  if (useFallback) {
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

    return cloneTables(memoryTables);
  }

  switch (action) {
    case "1":
      await dbPool.query("INSERT INTO table1 (name) VALUES (?)", ["New User"]);
      break;
    case "2":
      await dbPool.query("DELETE FROM table2 ORDER BY id LIMIT 1");
      break;
    case "3":
      await dbPool.query("UPDATE table3 SET name = ? WHERE id = ?", ["Updated User", 1]);
      break;
    default:
      throw new Error("Unsupported action");
  }

  return getTablesFromDb();
}

function getInMemoryTables() {
  return cloneTables(memoryTables);
}

module.exports = {
  getTablesFromDb,
  executeActionInDb,
  getInMemoryTables,
};
