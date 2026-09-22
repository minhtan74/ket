// Quản lý kết nối MySQL bằng mysql2 (thay cho PDO của PHP).
// Dùng connection pool + cache trên global để tránh tạo pool mới mỗi lần
// Next.js hot-reload trong môi trường dev.

import mysql from 'mysql2/promise';

function createPool() {
  // Ưu tiên biến TIDB_* (tự động có sẵn khi gắn TiDB Cloud qua Vercel
  // Integration), nếu không có thì dùng DB_* (MySQL local qua XAMPP).
  const host = process.env.TIDB_HOST || process.env.DB_HOST;
  const port = Number(process.env.TIDB_PORT || process.env.DB_PORT || 3306);
  const database = process.env.TIDB_DATABASE || process.env.DB_NAME;
  const user = process.env.TIDB_USER || process.env.DB_USER;
  const password = process.env.TIDB_PASSWORD || process.env.DB_PASSWORD;

  // TiDB Cloud bắt buộc SSL/TLS; XAMPP local thì không cần.
  const useSsl = Boolean(process.env.TIDB_HOST) || String(process.env.DB_SSL).toLowerCase() === 'true';

  return mysql.createPool({
    host,
    port,
    database,
    user,
    password,
    waitForConnections: true,
    connectionLimit: 10,
    charset: 'utf8mb4_unicode_ci',
    ssl: useSsl ? { minVersion: 'TLSv1.2' } : undefined,
  });
}

const globalForPool = globalThis;

const pool = globalForPool.__ketMysqlPool || createPool();

if (process.env.NODE_ENV !== 'production') {
  globalForPool.__ketMysqlPool = pool;
}

// Helper truy vấn: trả về mảng rows, giống $stmt->fetchAll() của PDO.
export async function query(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

// Helper lấy đúng 1 dòng, trả về null nếu không có, giống fetch() === false ? null.
export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

// Helper cho INSERT, trả về insertId, giống PDO::lastInsertId().
export async function insert(sql, params = []) {
  const [result] = await pool.query(sql, params);
  return result.insertId;
}

export default pool;
