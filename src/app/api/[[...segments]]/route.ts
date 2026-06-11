import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../../../../server/config/db");
const {
  sendMembershipNotifications,
  sendMembershipStatusNotification,
  sendComplaintNotifications,
  sendContactNotifications
} = require("../../../../server/services/notifications");
const {
  defaultSettings,
  getSettings,
  updateSettings
} = require("../../../../server/services/settings");
const {
  contactSchema,
  complaintSchema,
  membershipSchema
} = require("../../../../server/utils/validation");

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ segments?: string[] }>;
};

type AdminToken = {
  id: number;
  email: string;
  role: string;
};

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
  Object.keys(defaultSettings).reduce<Record<string, z.ZodOptional<z.ZodString>>>(
    (shape, key) => {
      shape[key] = z.string().trim().max(5000).optional();
      return shape;
    },
    {}
  )
);

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

async function routePath(context: RouteContext) {
  const params = await context.params;
  return params.segments || [];
}

async function bodyJson(request: NextRequest) {
  return request.json().catch(() => ({}));
}

function normalizeSlug(slug: string) {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function requireAdmin(request: NextRequest): Promise<AdminToken | NextResponse> {
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    return json({ message: "Authentication token is required." }, 401);
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET || "") as AdminToken;
  } catch {
    return json({ message: "Invalid or expired token." }, 401);
  }
}

function isResponse(value: unknown): value is NextResponse {
  return value instanceof NextResponse;
}

function errorResponse(error: unknown) {
  if (error instanceof ZodError) {
    return json(
      {
        message: "Validation failed.",
        errors: error.flatten().fieldErrors
      },
      400
    );
  }

  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "ER_DUP_ENTRY"
  ) {
    return json(
      { message: "A record with this CNIC, NTN, or email already exists." },
      409
    );
  }

  console.error(error);
  return json({ message: "Something went wrong. Please try again later." }, 500);
}

async function publicHealth() {
  const requiredEnv = ["DB_HOST", "DB_USER", "DB_NAME"];
  const missingEnv = requiredEnv.filter((key) => !process.env[key]);

  if (missingEnv.length > 0) {
    return json(
      {
        ok: false,
        service: "tpap-api",
        message: "Database environment variables are missing.",
        missingEnv
      },
      500
    );
  }

  try {
    await pool.query("SELECT 1");
    return json({ ok: true, service: "tpap-api", database: "connected" });
  } catch (error) {
    return json(
      {
        ok: false,
        service: "tpap-api",
        message: "Database connection failed.",
        code: error && typeof error === "object" && "code" in error ? error.code : undefined,
        detail:
          error && typeof error === "object" && "message" in error
            ? error.message
            : "Unknown database error"
      },
      500
    );
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const segments = await routePath(context);
    const [first, second, third] = segments;

    if (first === "health") {
      return publicHealth();
    }

    if (first === "settings") {
      return json({ settings: await getSettings() });
    }

    if (first === "blogs" && !second) {
      const [rows] = await pool.execute(
        `SELECT id, title, slug, excerpt, content, category, featured_image, seo_title,
          seo_description, status, published_at, created_at, updated_at
         FROM blogs
         WHERE status = 'published'
         ORDER BY COALESCE(published_at, created_at) DESC`
      );
      return json({ records: rows });
    }

    if (first === "blogs" && second) {
      const [rows] = await pool.execute(
        `SELECT id, title, slug, excerpt, content, category, featured_image, seo_title,
          seo_description, status, published_at, created_at, updated_at
         FROM blogs
         WHERE slug = ? AND status = 'published'
         LIMIT 1`,
        [second]
      );

      if (!rows[0]) {
        return json({ message: "Blog not found." }, 404);
      }

      return json({ record: rows[0] });
    }

    if (first === "leadership-profiles") {
      const [rows] = await pool.execute(
        `SELECT id, name, designation, bio, image_url, profile_type, sort_order, created_at
         FROM leadership_profiles
         ORDER BY profile_type ASC, sort_order ASC, created_at DESC`
      );
      return json({ records: rows });
    }

    if (first !== "admin") {
      return json({ message: "API endpoint not found." }, 404);
    }

    const admin = await requireAdmin(request);
    if (isResponse(admin)) {
      return admin;
    }

    if (second === "dashboard") {
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

      return json({
        stats: {
          membershipApplications: membershipTotal.count,
          pendingApprovals: membershipPending.count,
          approvedMemberships: membershipApproved.count,
          complaints: complaintsTotal.count,
          contactInquiries: contactTotal.count,
          blogs: blogsTotal.count
        }
      });
    }

    if (second === "settings") {
      return json({ settings: await getSettings() });
    }

    if (second === "membership-applications") {
      const status = request.nextUrl.searchParams.get("status");
      const allowedStatuses = ["pending", "approved", "rejected"];
      const where = status && allowedStatuses.includes(status) ? "WHERE status = ?" : "";
      const params = where ? [status] : [];
      const [rows] = await pool.execute(
        `SELECT id, first_name, last_name, cnic, ntn, organization_name, phone, email,
          office_address, status, membership_id, admin_notes, created_at, updated_at
         FROM membership_applications
         ${where}
         ORDER BY created_at DESC`,
        params
      );
      return json({ records: rows });
    }

    if (second === "complaints") {
      const [rows] = await pool.execute(
        `SELECT id, full_name, email, phone, subject, message, status, admin_notes, created_at, updated_at
         FROM complaints
         ORDER BY created_at DESC`
      );
      return json({ records: rows });
    }

    if (second === "contact-inquiries") {
      const [rows] = await pool.execute(
        `SELECT id, name, email, phone, message, status, created_at, updated_at
         FROM contact_inquiries
         ORDER BY created_at DESC`
      );
      return json({ records: rows });
    }

    if (second === "blogs") {
      const [rows] = await pool.execute(
        `SELECT id, title, slug, excerpt, content, category, featured_image, seo_title,
          seo_description, status, published_at, created_at, updated_at
         FROM blogs
         ORDER BY created_at DESC`
      );
      return json({ records: rows });
    }

    if (second === "leadership-profiles") {
      const [rows] = await pool.execute(
        `SELECT id, name, designation, bio, image_url, profile_type, sort_order, created_at, updated_at
         FROM leadership_profiles
         ORDER BY profile_type ASC, sort_order ASC, created_at DESC`
      );
      return json({ records: rows });
    }

    if (second === "me") {
      const [rows] = await pool.execute(
        "SELECT id, name, email, role FROM admins WHERE id = ? LIMIT 1",
        [admin.id]
      );

      if (!rows[0]) {
        return json({ message: "Admin user not found." }, 404);
      }

      return json({ admin: rows[0] });
    }

    return json({ message: "API endpoint not found." }, 404);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const segments = await routePath(context);
    const [first, second] = segments;

    if (first === "membership-applications") {
      const data = membershipSchema.parse(await bodyJson(request));
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

      return json(
        {
          message: "Membership application submitted successfully.",
          id: result.insertId,
          customerNotificationSent: Boolean(notifications.customer.sent)
        },
        201
      );
    }

    if (first === "complaints") {
      const data = complaintSchema.parse(await bodyJson(request));
      const [result] = await pool.execute(
        `INSERT INTO complaints (full_name, email, phone, subject, message)
         VALUES (?, ?, ?, ?, ?)`,
        [data.fullName, data.email, data.phone, data.subject, data.message]
      );

      await sendComplaintNotifications(data, result.insertId);

      return json(
        {
          message: "Complaint or suggestion submitted successfully.",
          id: result.insertId
        },
        201
      );
    }

    if (first === "contact-inquiries") {
      const data = contactSchema.parse(await bodyJson(request));
      const [result] = await pool.execute(
        `INSERT INTO contact_inquiries (name, email, phone, message)
         VALUES (?, ?, ?, ?)`,
        [data.name, data.email, data.phone, data.message]
      );

      await sendContactNotifications(data, result.insertId);

      return json(
        {
          message: "Contact inquiry submitted successfully.",
          id: result.insertId
        },
        201
      );
    }

    if (first !== "admin") {
      return json({ message: "API endpoint not found." }, 404);
    }

    if (second === "login") {
      const data = loginSchema.parse(await bodyJson(request));
      const [rows] = await pool.execute(
        "SELECT id, name, email, password_hash, role FROM admins WHERE email = ? LIMIT 1",
        [data.email]
      );
      const admin = rows[0];

      if (!admin || !(await bcrypt.compare(data.password, admin.password_hash))) {
        return json({ message: "Invalid email or password." }, 401);
      }

      const token = jwt.sign(
        {
          id: admin.id,
          email: admin.email,
          role: admin.role
        },
        process.env.JWT_SECRET || "",
        { expiresIn: "8h" }
      );

      return json({
        message: "Login successful.",
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      });
    }

    const admin = await requireAdmin(request);
    if (isResponse(admin)) {
      return admin;
    }

    if (second === "blogs") {
      const data = blogSchema.parse(await bodyJson(request));
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

      return json({ message: "Blog created successfully.", id: result.insertId }, 201);
    }

    if (second === "leadership-profiles") {
      const data = leadershipSchema.parse(await bodyJson(request));
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

      return json({ message: "Leadership profile created successfully.", id: result.insertId }, 201);
    }

    if (second === "uploads" && segments[2] === "image") {
      const formData = await request.formData();
      const file = formData.get("image");

      if (!(file instanceof File)) {
        return json({ message: "Image file is required." }, 400);
      }

      if (!file.type.startsWith("image/")) {
        return json({ message: "Only image uploads are allowed." }, 400);
      }

      if (file.size > 3 * 1024 * 1024) {
        return json({ message: "Image file must be 3MB or smaller." }, 400);
      }

      const extension = path.extname(file.name) || ".jpg";
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()));

      return json(
        {
          message: "Image uploaded successfully.",
          url: `/uploads/${filename}`
        },
        201
      );
    }

    return json({ message: "API endpoint not found." }, 404);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const segments = await routePath(context);
    const [first, second, third] = segments;

    if (first !== "admin") {
      return json({ message: "API endpoint not found." }, 404);
    }

    const admin = await requireAdmin(request);
    if (isResponse(admin)) {
      return admin;
    }

    if (second === "settings") {
      const data = settingsSchema.parse(await bodyJson(request));
      const settings = await updateSettings(data);
      return json({ message: "Website settings updated successfully.", settings });
    }

    if (second === "blogs" && third) {
      const data = blogSchema.parse(await bodyJson(request));
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
          third
        ]
      );

      return json({ message: "Blog updated successfully." });
    }

    if (second === "leadership-profiles" && third) {
      const data = leadershipSchema.parse(await bodyJson(request));
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
          third
        ]
      );

      return json({ message: "Leadership profile updated successfully." });
    }

    return json({ message: "API endpoint not found." }, 404);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const segments = await routePath(context);
    const [first, second, third, fourth] = segments;

    if (first !== "admin" || fourth !== "status") {
      return json({ message: "API endpoint not found." }, 404);
    }

    const admin = await requireAdmin(request);
    if (isResponse(admin)) {
      return admin;
    }

    if (second === "membership-applications" && third) {
      const schema = z.object({
        status: z.enum(["pending", "approved", "rejected"]),
        adminNotes: z.string().trim().max(2000).optional().nullable()
      });
      const data = schema.parse(await bodyJson(request));
      const [applicationRows] = await pool.execute(
        `SELECT id, first_name, last_name, email, status
         FROM membership_applications
         WHERE id = ?
         LIMIT 1`,
        [third]
      );
      const application = applicationRows[0];

      if (!application) {
        return json({ message: "Membership application not found." }, 404);
      }

      const membershipId =
        data.status === "approved" ? `TPAP-${String(third).padStart(5, "0")}` : null;

      await pool.execute(
        `UPDATE membership_applications
         SET status = ?, admin_notes = ?, membership_id = ?
         WHERE id = ?`,
        [data.status, data.adminNotes || null, membershipId, third]
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

      return json({
        message: "Membership application updated successfully.",
        customerNotificationSent: Boolean(notification.sent)
      });
    }

    if (second === "complaints" && third) {
      const schema = z.object({
        status: z.enum(["pending", "in_process", "resolved"]),
        adminNotes: z.string().trim().max(2000).optional().nullable()
      });
      const data = schema.parse(await bodyJson(request));

      await pool.execute("UPDATE complaints SET status = ?, admin_notes = ? WHERE id = ?", [
        data.status,
        data.adminNotes || null,
        third
      ]);

      return json({ message: "Complaint updated successfully." });
    }

    if (second === "contact-inquiries" && third) {
      const schema = z.object({
        status: z.enum(["new", "read", "archived"])
      });
      const data = schema.parse(await bodyJson(request));

      await pool.execute("UPDATE contact_inquiries SET status = ? WHERE id = ?", [
        data.status,
        third
      ]);

      return json({ message: "Contact inquiry updated successfully." });
    }

    return json({ message: "API endpoint not found." }, 404);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const segments = await routePath(context);
    const [first, second, third] = segments;

    if (first !== "admin") {
      return json({ message: "API endpoint not found." }, 404);
    }

    const admin = await requireAdmin(request);
    if (isResponse(admin)) {
      return admin;
    }

    if (second === "contact-inquiries" && third) {
      await pool.execute("DELETE FROM contact_inquiries WHERE id = ?", [third]);
      return json({ message: "Contact inquiry deleted successfully." });
    }

    if (second === "blogs" && third) {
      await pool.execute("DELETE FROM blogs WHERE id = ?", [third]);
      return json({ message: "Blog deleted successfully." });
    }

    if (second === "leadership-profiles" && third) {
      await pool.execute("DELETE FROM leadership_profiles WHERE id = ?", [third]);
      return json({ message: "Leadership profile deleted successfully." });
    }

    return json({ message: "API endpoint not found." }, 404);
  } catch (error) {
    return errorResponse(error);
  }
}
