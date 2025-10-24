"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: './db/schema.ts',
    dialect: 'mysql',
    out: './db/drizzle',
    dbCredentials: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456',
        database: 'nest_admin_sql'
    }
});
//# sourceMappingURL=drizzle.config.js.map