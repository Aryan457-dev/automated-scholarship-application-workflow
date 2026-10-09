
const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// Get all available scholarships
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, description, eligibility_criteria, deadline
       FROM scholarships
       WHERE deadline IS NULL OR deadline >= CURRENT_DATE
       ORDER BY id DESC`
    );

    res.json({
      count: result.rows.length,
      scholarships: result.rows,
    });
  } catch (error) {
    console.error("Scholarship error:", error.message);
    res.status(500).json({ message: "Failed to fetch scholarships" });
  }
});

module.exports = router;
