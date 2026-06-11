const mysql = require("mysql2/promise");

const connectTimeout = Number(process.env.DB_CONNECT_TIMEOUT_MS || 1200);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 5),
  maxIdle: Number(process.env.DB_MAX_IDLE || 3),
  idleTimeout: Number(process.env.DB_IDLE_TIMEOUT_MS || 60000),
  queueLimit: Number(process.env.DB_QUEUE_LIMIT || 20),
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

module.exports = { pool };
