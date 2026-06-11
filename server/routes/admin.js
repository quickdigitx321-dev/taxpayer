const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { pool } = require("../config/db");
const { requireAdmin } = require("../middleware/auth");
const { imageUpload } = require("../middleware/upload");
const { defaultSettings, getSettings, updateSettings } = require("../services/settings");
const {
  sendComplaintStatusNotification,
  sendMembershipStatusNotification
} = require("../services/notifications");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6)
});

const blogSchema = z.object({
  title: z.string().trim().min(3).max(220),
  slug: z.string().trim().min(3).max(240),
  excerpt: z.string().trim().max(2000).optional().nullable(),
  content: z.string().trim().min(10),
  category: z.string().trim().max(120).optional().nullable(),
  featuredImage: z.string().trim().max(500).optional().nullable(),
  seoTitle: z.string().trim().max(220).optional().nullable(),
  seoDescription: z.string().trim().max(320).optional().nullable(),
  status: z.enum(["draft", "published"])
});

const leadershipSchema = z.object({
  name: z.string().trim().min(2).max(160),
  designation: z.string().trim().min(2).max(160),
  bio: z.string().trim().max(5000).optional().nullable(),
  imageUrl: z.string().trim().max(500).optional().nullable(),
  profileType: z.enum(["current", "former"]),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional()
});

const settingsSchema = z.object(
  Object.keys(defaultSettings).reduce((shape, key) => {
    shape[key] = z.string().trim().max(5000).optional();
    return shape;
  }, {})
);

function normalizeSlug(slug) {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const data = loginSchema.parse(req.body);

    const [rows] = await pool.execute(
      "SELECT id, name, email, password_hash, role FROM admins WHERE email = ? LIMIT 1",
      [data.email]
    );

    const admin = rows[0];
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isValidPassword = await bcrypt.compare(data.password, admin.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({
      message: "Login successful.",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  })
);

router.get(
  "/me",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const [rows] = await pool.execute(
      "SELECT id, name, email, role FROM admins WHERE id = ? LIMIT 1",
      [req.admin.id]
    );

    if (!rows[0]) {
      return res.status(404).json({ message: "Admin user not found." });
    }

    return res.json({ admin: rows[0] });
  })
);

router.get(
  "/dashboard",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const [[membershipTotal]] = await pool.execute(
      "SELECT COUNT(*) AS count FROM membership_applications"
    );
    const [[membershipPending]] = await pool.execute(
      "SELECT COUNT(*) AS count FROM membership_applications WHERE status = 'pending'"
    );
    const [[membershipApproved]] = await pool.execute(
      "SELECT COUNT(*) AS count FROM membership_applications WHERE status = 'approved'"
    );
    const [[complaintsTotal]] = await pool.execute("SELECT COUNT(*) AS count FROM complaints");
    const [[contactTotal]] = await pool.execute(
      "SELECT COUNT(*) AS count FROM contact_inquiries"
    );
    const [[blogsTotal]] = await pool.execute("SELECT COUNT(*) AS count FROM blogs");

    return res.json({
      stats: {
        membershipApplications: membershipTotal.count,
        pendingApprovals: membershipPending.count,
        approvedMemberships: membershipApproved.count,
        complaints: complaintsTotal.count,
        contactInquiries: contactTotal.count,
        blogs: blogsTotal.count
      }
    });
  })
);

router.get(
  "/settings",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const settings = await getSettings();
    return res.json({ settings });
  })
);

router.put(
  "/settings",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const data = settingsSchema.parse(req.body);
    const settings = await updateSettings(data);

    return res.json({
      message: "Website settings updated successfully.",
      settings
    });
  })
);

router.get(
  "/membership-applications",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const status = req.query.status;
    const allowedStatuses = ["pending", "approved", "rejected"];
    const where = allowedStatuses.includes(status) ? "WHERE status = ?" : "";
    const params = where ? [status] : [];

    const [rows] = await pool.execute(
      `SELECT id, first_name, last_name, cnic, ntn, organization_name, phone, email,
        office_address, status, membership_id, admin_notes, created_at, updated_at
       FROM membership_applications
       ${where}
       ORDER BY created_at DESC`,
      params
    );

    return res.json({ records: rows });
  })
);

router.patch(
  "/membership-applications/:id/status",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const schema = z.object({
      status: z.enum(["pending", "approved", "rejected"]),
      adminNotes: z.string().trim().max(2000).optional().nullable()
    });
    const data = schema.parse(req.body);
    const [applicationRows] = await pool.execute(
      `SELECT id, first_name, last_name, email, status
       FROM membership_applications
       WHERE id = ?
       LIMIT 1`,
      [req.params.id]
    );
    const application = applicationRows[0];

    if (!application) {
      return res.status(404).json({ message: "Membership application not found." });
    }

    const membershipId =
      data.status === "approved" ? `TPAP-${String(req.params.id).padStart(5, "0")}` : null;

    await pool.execute(
      `UPDATE membership_applications
       SET status = ?, admin_notes = ?, membership_id = ?
       WHERE id = ?`,
      [data.status, data.adminNotes || null, membershipId, req.params.id]
    );

    const notification =
      application.status !== data.status
        ? await sendMembershipStatusNotification(
            application,
            data.status,
            membershipId,
            data.adminNotes || ""
          )
        : { sent: false, skipped: true };

    return res.json({
      message: "Membership application updated successfully.",
      customerNotificationSent: Boolean(notification.sent)
    });
  })
);

router.get(
  "/complaints",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const [rows] = await pool.execute(
      `SELECT id, full_name, email, phone, subject, message, status, admin_notes, created_at, updated_at
       FROM complaints
       ORDER BY created_at DESC`
    );

    return res.json({ records: rows });
  })
);

router.patch(
  "/complaints/:id/status",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const schema = z.object({
      status: z.enum(["pending", "in_process", "resolved"]),
      adminNotes: z.string().trim().max(2000).optional().nullable()
    });
    const data = schema.parse(req.body);
    const [complaintRows] = await pool.execute(
      `SELECT id, full_name, email, subject, status
       FROM complaints
       WHERE id = ?
       LIMIT 1`,
      [req.params.id]
    );
    const complaint = complaintRows[0];

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    await pool.execute("UPDATE complaints SET status = ?, admin_notes = ? WHERE id = ?", [
      data.status,
      data.adminNotes || null,
      req.params.id
    ]);

    const notification =
      complaint.status !== data.status
        ? await sendComplaintStatusNotification(
            complaint,
            data.status,
            data.adminNotes || ""
          )
        : { sent: false, skipped: true };

    return res.json({
      message: "Complaint updated successfully.",
      customerNotificationSent: Boolean(notification.sent)
    });
  })
);

router.get(
  "/contact-inquiries",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const [rows] = await pool.execute(
      `SELECT id, name, email, phone, message, status, created_at, updated_at
       FROM contact_inquiries
       ORDER BY created_at DESC`
    );

    return res.json({ records: rows });
  })
);

router.patch(
  "/contact-inquiries/:id/status",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const schema = z.object({
      status: z.enum(["new", "read", "archived"])
    });
    const data = schema.parse(req.body);

    await pool.execute("UPDATE contact_inquiries SET status = ? WHERE id = ?", [
      data.status,
      req.params.id
    ]);

    return res.json({ message: "Contact inquiry updated successfully." });
  })
);

router.delete(
  "/contact-inquiries/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    await pool.execute("DELETE FROM contact_inquiries WHERE id = ?", [req.params.id]);

    return res.json({ message: "Contact inquiry deleted successfully." });
  })
);

router.get(
  "/blogs",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const [rows] = await pool.execute(
      `SELECT id, title, slug, excerpt, content, category, featured_image, seo_title,
        seo_description, status, published_at, created_at, updated_at
       FROM blogs
       ORDER BY created_at DESC`
    );

    return res.json({ records: rows });
  })
);

router.post(
  "/blogs",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const data = blogSchema.parse(req.body);
    const slug = normalizeSlug(data.slug);
    const publishedAt = data.status === "published" ? new Date() : null;

    const [result] = await pool.execute(
      `INSERT INTO blogs
        (title, slug, excerpt, content, category, featured_image, seo_title,
         seo_description, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.title,
        slug,
        data.excerpt || null,
        data.content,
        data.category || null,
        data.featuredImage || null,
        data.seoTitle || null,
        data.seoDescription || null,
        data.status,
        publishedAt
      ]
    );

    return res.status(201).json({
      message: "Blog created successfully.",
      id: result.insertId
    });
  })
);

router.put(
  "/blogs/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const data = blogSchema.parse(req.body);
    const slug = normalizeSlug(data.slug);
    const publishedAt = data.status === "published" ? new Date() : null;

    await pool.execute(
      `UPDATE blogs
       SET title = ?, slug = ?, excerpt = ?, content = ?, category = ?,
         featured_image = ?, seo_title = ?, seo_description = ?, status = ?,
         published_at = COALESCE(published_at, ?)
       WHERE id = ?`,
      [
        data.title,
        slug,
        data.excerpt || null,
        data.content,
        data.category || null,
        data.featuredImage || null,
        data.seoTitle || null,
        data.seoDescription || null,
        data.status,
        publishedAt,
        req.params.id
      ]
    );

    return res.json({ message: "Blog updated successfully." });
  })
);

router.delete(
  "/blogs/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    await pool.execute("DELETE FROM blogs WHERE id = ?", [req.params.id]);

    return res.json({ message: "Blog deleted successfully." });
  })
);

router.get(
  "/leadership-profiles",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const [rows] = await pool.execute(
      `SELECT id, name, designation, bio, image_url, profile_type, sort_order, created_at, updated_at
       FROM leadership_profiles
       ORDER BY profile_type ASC, sort_order ASC, created_at DESC`
    );

    return res.json({ records: rows });
  })
);

router.post(
  "/leadership-profiles",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const data = leadershipSchema.parse(req.body);

    const [result] = await pool.execute(
      `INSERT INTO leadership_profiles
        (name, designation, bio, image_url, profile_type, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.designation,
        data.bio || null,
        data.imageUrl || null,
        data.profileType,
        data.sortOrder || 0
      ]
    );

    return res.status(201).json({
      message: "Leadership profile created successfully.",
      id: result.insertId
    });
  })
);

router.put(
  "/leadership-profiles/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const data = leadershipSchema.parse(req.body);

    await pool.execute(
      `UPDATE leadership_profiles
       SET name = ?, designation = ?, bio = ?, image_url = ?, profile_type = ?, sort_order = ?
       WHERE id = ?`,
      [
        data.name,
        data.designation,
        data.bio || null,
        data.imageUrl || null,
        data.profileType,
        data.sortOrder || 0,
        req.params.id
      ]
    );

    return res.json({ message: "Leadership profile updated successfully." });
  })
);

router.delete(
  "/leadership-profiles/:id",
  requireAdmin,
  asyncHandler(async (req, res) => {
    await pool.execute("DELETE FROM leadership_profiles WHERE id = ?", [req.params.id]);

    return res.json({ message: "Leadership profile deleted successfully." });
  })
);

router.post(
  "/uploads/image",
  requireAdmin,
  imageUpload.single("image"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    return res.status(201).json({
      message: "Image uploaded successfully.",
      url: imageUrl
    });
  })
);

module.exports = { adminRouter: router };
