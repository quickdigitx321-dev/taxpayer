CREATE TABLE IF NOT EXISTS membership_applications (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  cnic VARCHAR(20) NOT NULL,
  ntn VARCHAR(30) NOT NULL,
  organization_name VARCHAR(180) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(180) NOT NULL,
  office_address TEXT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  membership_id VARCHAR(60) NULL,
  admin_notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_membership_cnic (cnic),
  UNIQUE KEY unique_membership_ntn (ntn),
  UNIQUE KEY unique_membership_email (email),
  KEY membership_status_index (status),
  KEY membership_created_at_index (created_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS complaints (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(160) NOT NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  subject VARCHAR(220) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('pending', 'in_process', 'resolved') NOT NULL DEFAULT 'pending',
  admin_notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY complaints_status_index (status),
  KEY complaints_created_at_index (created_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'archived') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY contact_status_index (status),
  KEY contact_created_at_index (created_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admins (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor') NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_admin_email (email)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blogs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(240) NOT NULL,
  excerpt TEXT NULL,
  content LONGTEXT NOT NULL,
  category VARCHAR(120) NULL,
  featured_image VARCHAR(500) NULL,
  seo_title VARCHAR(220) NULL,
  seo_description VARCHAR(320) NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_blog_slug (slug),
  KEY blog_status_index (status)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS leadership_profiles (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  designation VARCHAR(160) NOT NULL,
  bio TEXT NULL,
  image_url VARCHAR(500) NULL,
  profile_type ENUM('current', 'former') NOT NULL DEFAULT 'current',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY leadership_type_index (profile_type)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS website_settings (
  setting_key VARCHAR(120) NOT NULL PRIMARY KEY,
  setting_value TEXT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO website_settings (setting_key, setting_value) VALUES
  ('siteTitle', 'Tax Payer Alliance Pakistan'),
  ('logoUrl', ''),
  ('faviconUrl', ''),
  ('contactEmail', 'admin@taxpayeralliancepakistan.com'),
  ('phone', ''),
  ('address', ''),
  ('facebook', ''),
  ('twitter', ''),
  ('linkedin', ''),
  ('instagram', ''),
  ('whatsapp', ''),
  ('footerText', 'Official digital platform for TPAP membership, public submissions, leadership, articles, and taxpayer advocacy.'),
  ('seoTitle', 'Tax Payer Alliance Pakistan'),
  ('seoDescription', 'Official website of Tax Payer Alliance Pakistan for membership, taxpayer advocacy, articles, and public submissions.'),
  ('analyticsCode', '')
ON DUPLICATE KEY UPDATE setting_key = setting_key;
