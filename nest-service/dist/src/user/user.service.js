"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
let UserService = class UserService {
    async create(createUserDto) {
        const existingUser = await db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.username, createUserDto.username));
        if (existingUser.length > 0) {
            throw new common_1.ConflictException('用户名已存在');
        }
        const saltRounds = 10;
    }
    findAll() {
        return db_1.db.select({
            id: schema_1.users.id,
            username: schema_1.users.username,
            email: schema_1.users.email,
            phone: schema_1.users.phone,
            avatar: schema_1.users.avatar,
            nickname: schema_1.users.nickname,
            status: schema_1.users.status,
            createdAt: schema_1.users.createdAt,
            updatedAt: schema_1.users.updatedAt,
        }).from(schema_1.users);
    }
    findOne(id) {
        return db_1.db.select({
            id: schema_1.users.id,
            username: schema_1.users.username,
            email: schema_1.users.email,
            phone: schema_1.users.phone,
            avatar: schema_1.users.avatar,
            nickname: schema_1.users.nickname,
            status: schema_1.users.status,
            createdAt: schema_1.users.createdAt,
            updatedAt: schema_1.users.updatedAt,
        }).from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
    }
    async update(id, updateUserDto) {
        const existingUser = await db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
        if (existingUser.length === 0) {
            throw new common_1.NotFoundException('用户不存在');
        }
        if (updateUserDto.username && updateUserDto.username !== existingUser[0].username) {
            const userWithSameUsername = await db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.username, updateUserDto.username));
            if (userWithSameUsername.length > 0) {
                throw new common_1.ConflictException('用户名已存在');
            }
        }
        const updateData = {};
        if (updateUserDto.username) {
            updateData.username = updateUserDto.username;
        }
        if (updateUserDto.email) {
            updateData.email = updateUserDto.email;
        }
        if (updateUserDto.phone) {
            updateData.phone = updateUserDto.phone;
        }
        if (updateUserDto.avatar) {
            updateData.avatar = updateUserDto.avatar;
        }
        if (updateUserDto.nickname) {
            updateData.nickname = updateUserDto.nickname;
        }
        if (updateUserDto.status !== undefined) {
            updateData.status = updateUserDto.status;
        }
        if (updateUserDto.password) {
            const saltRounds = 10;
        }
        await db_1.db.update(schema_1.users).set(updateData).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
        const updatedUser = await db_1.db.select({
            id: schema_1.users.id,
            username: schema_1.users.username,
            email: schema_1.users.email,
            phone: schema_1.users.phone,
            avatar: schema_1.users.avatar,
            nickname: schema_1.users.nickname,
            status: schema_1.users.status,
            createdAt: schema_1.users.createdAt,
            updatedAt: schema_1.users.updatedAt,
        }).from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
        return updatedUser[0];
    }
    async remove(id) {
        const existingUser = await db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
        if (existingUser.length === 0) {
            throw new common_1.NotFoundException('用户不存在');
        }
        await db_1.db.delete(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
        return { message: '用户删除成功' };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map