require("dotenv").config();

const bcrypt = require("bcryptjs");
const { pool } = require("../config/db");

async function seedAdmin() {
  const name = process.env.ADMIN_NAME || "TPAP Admin";
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required in .env");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await pool.execute(
    `INSERT INTO admins (name, email, password_hash, role)
     VALUES (?, ?, ?, 'admin')
     ON DUPLICATE KEY UPDATE
       name = VALUES(name),
       password_hash = VALUES(password_hash),
       role = 'admin'`,
    [name, email, passwordHash]
  );

  console.log(`Admin ready: ${email}`);
  await pool.end();
}

seedAdmin().catch(async (error) => {
  console.error(error);
  await pool.end();
  process.exit(1);
});
