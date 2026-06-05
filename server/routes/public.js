const express = require("express");
const { pool } = require("../config/db");
const {
  publicFormAntiSpam,
  publicFormRateLimit
} = require("../middleware/antiSpam");
const {
  sendMembershipNotifications,
  sendComplaintNotifications,
  sendContactNotifications
} = require("../services/notifications");
const { getSettings } = require("../services/settings");
const { asyncHandler } = require("../utils/asyncHandler");
const {
  contactSchema,
  complaintSchema,
  membershipSchema
} = require("../utils/validation");

const router = express.Router();

router.get(
  "/health",
  asyncHandler(async (_req, res) => {
    const requiredEnv = ["DB_HOST", "DB_USER", "DB_NAME"];
    const missingEnv = requiredEnv.filter((key) => !process.env[key]);

    if (missingEnv.length > 0) {
      return res.status(500).json({
        ok: false,
        service: "tpap-api",
        message: "Database environment variables are missing.",
        missingEnv
      });
    }

    try {
      await pool.query("SELECT 1");
      return res.json({ ok: true, service: "tpap-api", database: "connected" });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        service: "tpap-api",
        message: "Database connection failed.",
        code: error.code,
        detail: error.message
      });
    }
  })
);

router.get(
  "/settings",
  asyncHandler(async (_req, res) => {
    const settings = await getSettings();
    res.json({ settings });
  })
);

router.post(
  "/membership-applications",
  publicFormRateLimit,
  publicFormAntiSpam,
  asyncHandler(async (req, res) => {
    const data = membershipSchema.parse(req.body);

    const [result] = await pool.execute(
      `INSERT INTO membership_applications
        (first_name, last_name, cnic, ntn, organization_name, phone, email, office_address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.firstName,
        data.lastName,
        data.cnic,
        data.ntn,
        data.organizationName,
        data.phone,
        data.email,
        data.officeAddress
      ]
    );

    const notifications = await sendMembershipNotifications(data, result.insertId);

    res.status(201).json({
      message: "Membership application submitted successfully.",
      id: result.insertId,
      customerNotificationSent: Boolean(notifications.customer.sent)
    });
  })
);

router.post(
  "/complaints",
  publicFormRateLimit,
  publicFormAntiSpam,
  asyncHandler(async (req, res) => {
    const data = complaintSchema.parse(req.body);

    const [result] = await pool.execute(
      `INSERT INTO complaints (full_name, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [data.fullName, data.email, data.phone, data.subject, data.message]
    );

    await sendComplaintNotifications(data, result.insertId);

    res.status(201).json({
      message: "Complaint or suggestion submitted successfully.",
      id: result.insertId
    });
  })
);

router.post(
  "/contact-inquiries",
  publicFormRateLimit,
  publicFormAntiSpam,
  asyncHandler(async (req, res) => {
    const data = contactSchema.parse(req.body);

    const [result] = await pool.execute(
      `INSERT INTO contact_inquiries (name, email, phone, message)
       VALUES (?, ?, ?, ?)`,
      [data.name, data.email, data.phone, data.message]
    );

    await sendContactNotifications(data, result.insertId);

    res.status(201).json({
      message: "Contact inquiry submitted successfully.",
      id: result.insertId
    });
  })
);

router.get(
  "/blogs",
  asyncHandler(async (_req, res) => {
    const [rows] = await pool.execute(
      `SELECT id, title, slug, excerpt, content, category, featured_image, seo_title,
        seo_description, status, published_at, created_at, updated_at
       FROM blogs
       WHERE status = 'published'
       ORDER BY COALESCE(published_at, created_at) DESC`
    );

    return res.json({ records: rows });
  })
);

router.get(
  "/blogs/:slug",
  asyncHandler(async (req, res) => {
    const [rows] = await pool.execute(
      `SELECT id, title, slug, excerpt, content, category, featured_image, seo_title,
        seo_description, status, published_at, created_at, updated_at
       FROM blogs
       WHERE slug = ? AND status = 'published'
       LIMIT 1`,
      [req.params.slug]
    );

    if (!rows[0]) {
      return res.status(404).json({ message: "Blog not found." });
    }

    return res.json({ record: rows[0] });
  })
);

router.get(
  "/leadership-profiles",
  asyncHandler(async (_req, res) => {
    const [rows] = await pool.execute(
      `SELECT id, name, designation, bio, image_url, profile_type, sort_order, created_at
       FROM leadership_profiles
       ORDER BY profile_type ASC, sort_order ASC, created_at DESC`
    );

    return res.json({ records: rows });
  })
);

module.exports = { publicRouter: router };
