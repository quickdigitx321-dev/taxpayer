require("dotenv").config();

const cors = require("cors");
const express = require("express");
const path = require("path");
const { ZodError } = require("zod");
const { adminRouter } = require("./routes/admin");
const { publicRouter } = require("./routes/public");

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000"
  })
);
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "TPAP API" });
});

app.use("/api", publicRouter);
app.use("/api/admin", adminRouter);

app.use((err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed.",
      errors: err.flatten().fieldErrors
    });
  }

  if (err && err.message === "Only image uploads are allowed.") {
    return res.status(400).json({ message: err.message });
  }

  if (err && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "Image file must be 3MB or smaller." });
  }

  if (err && err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      message: "A record with this CNIC, NTN, or email already exists."
    });
  }

  console.error(err);
  return res.status(500).json({
    message: "Something went wrong. Please try again later."
  });
});

app.listen(port, () => {
  console.log(`TPAP API running on http://localhost:${port}`);
});
