import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    // 检查用户名是否已存在
    const existingUser = await db.select().from(users).where(eq(users.username, createUserDto.username));
    if (existingUser.length > 0) {
      throw new ConflictException('用户名已存在');
    }

    // 加密密码
    const saltRounds = 10;

    // // 创建用户
    // const result = await db.insert(users).values({
    //   username: createUserDto.username,
    //   // password: hashedPassword,
    //   email: createUserDto.email,
    //   phone: createUserDto.phone,
    //   avatar: createUserDto.avatar,
    //   nickname: createUserDto.nickname,
    //   status: createUserDto.status || 1,
    // });

    // // 返回创建的用户信息（不包含密码）
    // const newUser = await db.select({
    //   id: users.id,
    //   username: users.username,
    //   email: users.email,
    //   phone: users.phone,
    //   avatar: users.avatar,
    //   nickname: users.nickname,
    //   status: users.status,
    //   createdAt: users.createdAt,
    //   updatedAt: users.updatedAt,
    // }).from(users).where(eq(users.id, result[0].insertId));

    // return newUser[0];
  }

  findAll() {
    return db.select({
      id: users.id,
      username: users.username,
      email: users.email,
      phone: users.phone,
      avatar: users.avatar,
      nickname: users.nickname,
      status: users.status,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    }).from(users);
  }

  findOne(id: number) {
    return db.select({
      id: users.id,
      username: users.username,
      email: users.email,
      phone: users.phone,
      avatar: users.avatar,
      nickname: users.nickname,
      status: users.status,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    }).from(users).where(eq(users.id, id));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 检查用户是否存在
    const existingUser = await db.select().from(users).where(eq(users.id, id));
    if (existingUser.length === 0) {
      throw new NotFoundException('用户不存在');
    }

    // 如果更新用户名，检查新用户名是否已存在
    if (updateUserDto.username && updateUserDto.username !== existingUser[0].username) {
      const userWithSameUsername = await db.select().from(users).where(eq(users.username, updateUserDto.username));
      if (userWithSameUsername.length > 0) {
        throw new ConflictException('用户名已存在');
      }
    }

    // 准备更新数据
    const updateData: any = {};
    if (updateUserDto.username) {updateData.username = updateUserDto.username;}
    if (updateUserDto.email) {updateData.email = updateUserDto.email;}
    if (updateUserDto.phone) {updateData.phone = updateUserDto.phone;}
    if (updateUserDto.avatar) {updateData.avatar = updateUserDto.avatar;}
    if (updateUserDto.nickname) {updateData.nickname = updateUserDto.nickname;}
    if (updateUserDto.status !== undefined) {updateData.status = updateUserDto.status;}

    // 如果更新密码，需要加密
    if (updateUserDto.password) {
      const saltRounds = 10;
    }

    // 执行更新
    await db.update(users).set(updateData).where(eq(users.id, id));

    // 返回更新后的用户信息（不包含密码）
    const updatedUser = await db.select({
      id: users.id,
      username: users.username,
      email: users.email,
      phone: users.phone,
      avatar: users.avatar,
      nickname: users.nickname,
      status: users.status,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    }).from(users).where(eq(users.id, id));

    return updatedUser[0];
  }

  async remove(id: number) {
    // 检查用户是否存在
    const existingUser = await db.select().from(users).where(eq(users.id, id));
    if (existingUser.length === 0) {
      throw new NotFoundException('用户不存在');
    }

    // 删除用户
    await db.delete(users).where(eq(users.id, id));

    return { message: '用户删除成功' };
  }
}
