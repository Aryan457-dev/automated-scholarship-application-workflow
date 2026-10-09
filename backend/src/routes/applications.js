
const express = require("express");
const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Submit a scholarship application
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { scholarship_id, academic_year } = req.body;
    const studentId = req.user.id;

    if (
      scholarship_id === undefined ||
      !Number.isInteger(Number(scholarship_id)) ||
      Number(scholarship_id) < 1
    ) {
      return res.status(400).json({
        message: "A valid scholarship_id is required",
      });
    }

    const scholarship = await pool.query(
      `SELECT id, title
       FROM scholarships
       WHERE id = $1
         AND (deadline IS NULL OR deadline >= CURRENT_DATE)`,
      [Number(scholarship_id)]
    );

    if (scholarship.rows.length === 0) {
      return res.status(404).json({
        message: "Scholarship not found or application deadline has passed",
      });
    }

    const result = await pool.query(
      `INSERT INTO applications
       (student_id, scholarship_id, academic_year)
       VALUES ($1, $2, $3)
       RETURNING id, student_id, scholarship_id,
                 academic_year, status, submitted_at`,
      [
        studentId,
        Number(scholarship_id),
        academic_year || null,
      ]
    );

    res.status(201).json({
      message: "Scholarship application submitted successfully",
      application: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "You have already applied for this scholarship",
      });
    }

    console.error("Application submission error:", error.message);
    res.status(500).json({
      message: "Failed to submit application",
    });
  }
});

// Get applications belonging to the logged-in student
router.get("/my", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         a.id AS application_id,
         s.id AS scholarship_id,
         s.title,
         s.description,
         s.deadline,
         a.academic_year,
         a.status,
         a.remarks,
         a.submitted_at
       FROM applications a
       JOIN scholarships s ON s.id = a.scholarship_id
       WHERE a.student_id = $1
       ORDER BY a.submitted_at DESC`,
      [req.user.id]
    );

    res.json({
      count: result.rows.length,
      applications: result.rows,
    });
  } catch (error) {
    console.error("Fetch applications error:", error.message);
    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
});

module.exports = router;
