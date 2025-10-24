"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.db = void 0;
const mysql2_1 = require("drizzle-orm/mysql2");
const promise_1 = require("mysql2/promise");
const schema = require("./schema");
const poolConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
    database: "nest_admin_sql",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true,
    charset: "utf8mb4",
    timezone: "+08:00",
};
const pool = (0, promise_1.createPool)(poolConfig);
exports.pool = pool;
const db = (0, mysql2_1.drizzle)(pool, { schema, mode: "default" });
exports.db = db;
//# sourceMappingURL=index.js.map