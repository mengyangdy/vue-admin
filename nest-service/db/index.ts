import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";
import * as schema from "./schema";

// 创建连接池配置
const poolConfig = {
  host: "119.8.103.97",
  port: 3306,
  user: "root",
  password: "MENgyang110.",
  database: "nest_admin_sql",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  // 添加字符集配置
  charset: "utf8mb4",
  // 添加时区配置
  timezone: "+08:00",
};

// 创建连接池
const pool = createPool(poolConfig);

// 创建 Drizzle 实例
const db = drizzle(pool, { schema, mode: "default" });

export { db, pool };
