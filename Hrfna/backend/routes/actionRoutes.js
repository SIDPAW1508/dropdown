const express = require("express");
const { getTables, performAction } = require("../controllers/actionController");

const router = express.Router();

router.get("/tables", async (_req, res) => {
  try {
    const tables = await getTables();
    res.json(tables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tables" });
  }
});

router.post("/action", async (req, res) => {
  try {
    const { action } = req.body;
    const tables = await performAction(action);
    res.json(tables);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
