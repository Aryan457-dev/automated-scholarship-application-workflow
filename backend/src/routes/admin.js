
const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Admin login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    !email ||
    !password ||
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      message: "Invalid admin credentials",
    });
  }

  const token = jwt.sign(
    { email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    message: "Admin login successful",
    token,
  });
});

// Middleware: admin access only
function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
}

// View all applications
router.get(
  "/applications",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          a.id AS application_id,
          st.full_name,
          st.email,
          s.title AS scholarship_title,
          a.academic_year,
          a.status,
          a.remarks,
          a.submitted_at
        FROM applications a
        JOIN students st ON st.id = a.student_id
        JOIN scholarships s ON s.id = a.scholarship_id
        ORDER BY a.submitted_at DESC
      `);

      res.json({
        count: result.rows.length,
        applications: result.rows,
      });
    } catch (error) {
      console.error("Admin fetch error:", error.message);
      res.status(500).json({
        message: "Failed to fetch applications",
      });
    }
  }
);

// Approve or reject an application
router.patch(
  "/applications/:id/status",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const applicationId = Number(req.params.id);
      const { status, remarks } = req.body;

      if (!Number.isInteger(applicationId) || applicationId < 1) {
        return res.status(400).json({
          message: "Invalid application ID",
        });
      }

      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({
          message: "Status must be approved or rejected",
        });
      }

      const result = await pool.query(
        `UPDATE applications
         SET status = $1, remarks = $2
         WHERE id = $3
         RETURNING id, status, remarks`,
        [status, remarks || null, applicationId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Application not found",
        });
      }

      res.json({
        message: `Application ${status} successfully`,
        application: result.rows[0],
      });
    } catch (error) {
      console.error("Admin update error:", error.message);
      res.status(500).json({
        message: "Failed to update application",
      });
    }
  }
);

module.exports = router;
