// Quản lý kết nối MySQL bằng mysql2 (thay cho PDO của PHP).
// Dùng connection pool + cache trên global để tránh tạo pool mới mỗi lần
// Next.js hot-reload trong môi trường dev.

import mysql from 'mysql2/promise';

function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    charset: 'utf8mb4_unicode_ci',
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
