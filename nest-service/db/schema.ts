import {
  int,
  mysqlTable,
  serial,
  varchar,
  datetime,
  text,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

// 用户表
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(), // 自增主键
  username: varchar("username", { length: 50 }).notNull().unique(), // 登录用户名
  password: varchar("password", { length: 255 }).notNull(), // 加密后的密码
  email: varchar("email", { length: 100 }), // 邮箱
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(
    sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`
  ),
});

// 角色表
export const roles = mysqlTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(), // 角色名
  description: text("description"), // 角色描述
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(
    sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`
  ),
});

// 菜单 / 权限表
export const menus = mysqlTable("menus", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(), // 菜单或权限名称
  path: varchar("path", { length: 255 }), // 前端路由路径
  parentId: int("parent_id").default(0), // 父菜单ID
  icon: varchar("icon", { length: 100 }), // 图标
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(
    sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`
  ),
});

// 用户-角色多对多
export const userRoles = mysqlTable("user_roles", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(), // 对应 users.id
  roleId: int("role_id").notNull(), // 对应 roles.id
});

// 角色-菜单多对多
export const roleMenus = mysqlTable("role_menus", {
  id: serial("id").primaryKey(),
  roleId: int("role_id").notNull(), // 对应 roles.id
  menuId: int("menu_id").notNull(), // 对应 menus.id
});
