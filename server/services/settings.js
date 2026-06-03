const { pool } = require("../config/db");

const defaultSettings = {
  siteTitle: "Tax Payer Alliance Pakistan",
  logoUrl: "",
  faviconUrl: "",
  contactEmail: "basitdev.bk@gmail.com",
  phone: "",
  address: "",
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: "",
  whatsapp: "",
  footerText:
    "Official digital platform for TPAP membership, public submissions, leadership, articles, and taxpayer advocacy.",
  seoTitle: "Tax Payer Alliance Pakistan",
  seoDescription:
    "Official website of Tax Payer Alliance Pakistan for membership, taxpayer advocacy, articles, and public submissions.",
  analyticsCode: ""
};

async function ensureSettingsTable() {
  await pool.execute(
    `CREATE TABLE IF NOT EXISTS website_settings (
      setting_key VARCHAR(120) NOT NULL PRIMARY KEY,
      setting_value TEXT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );

  await Promise.all(
    Object.entries(defaultSettings).map(([key, value]) =>
      pool.execute(
        `INSERT INTO website_settings (setting_key, setting_value)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_key = setting_key`,
        [key, value]
      )
    )
  );
}

async function getSettings() {
  await ensureSettingsTable();
  const [rows] = await pool.execute("SELECT setting_key, setting_value FROM website_settings");

  return rows.reduce(
    (settings, row) => ({
      ...settings,
      [row.setting_key]: row.setting_value || ""
    }),
    { ...defaultSettings }
  );
}

async function updateSettings(settings) {
  await ensureSettingsTable();

  const allowedKeys = Object.keys(defaultSettings);
  await Promise.all(
    allowedKeys.map((key) =>
      pool.execute(
        `INSERT INTO website_settings (setting_key, setting_value)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
        [key, settings[key] || ""]
      )
    )
  );

  return getSettings();
}

module.exports = {
  defaultSettings,
  getSettings,
  updateSettings
};
