const db = require("../config/db");

async function getTables() {
  const [table1] = await db.query("SELECT * FROM table1");
  const [table2] = await db.query("SELECT * FROM table2");
  const [table3] = await db.query("SELECT * FROM table3");
  return {
    table1,
    table2,
    table3,
  };
}
async function performAction(action) {
  switch (action) {
    case "1":
      await db.query(
        "INSERT INTO table1 (name) VALUES (?)",
        ["New User"]
      );
      break;
    case "2":
      await db.query(
        "DELETE FROM table2 ORDER BY id DESC LIMIT 1"
      );
      break;
    case "3":
      await db.query(
        "UPDATE table3 SET name = ? WHERE id = ?",
        ["Updated User", 1]
      );
      break;
    default:
      throw new Error("Unsupported action");
  }
  return getTables();
}
module.exports = {
  getTables,
  performAction,
};
 