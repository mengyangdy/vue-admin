import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq, like, and, isNull, sql } from "drizzle-orm";

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

  async findAll(query: QueryUserDto) {
    const { current = 1, size = 10, status, username, nickname, phone, email, gender } = query;
    // 构建查询条件
    const conditions: any[] = [];
    
    if (status === 0 || status === 1) {
      conditions.push(eq(users.status, status));
    }
    
    if ( gender === 0 || gender === 1 || gender === 2) {
      console.log(11111);
      
      conditions.push(eq(users.gender, gender));
    }
    
    if (username && username.trim() !== '') {
      conditions.push(like(users.username, `%${username}%`));
    }
    
    if (nickname && nickname.trim() !== '') {
      conditions.push(like(users.nickname, `%${nickname}%`));
    }
    
    if (phone && phone.trim() !== '') {
      conditions.push(like(users.phone, `%${phone}%`));
    }
    
    if (email && email.trim() !== '') {
      conditions.push(like(users.email, `%${email}%`));
    }
    console.log("🚀 ~ :82 ~ UserService ~ findAll ~ conditions:", conditions)
    
    // 计算分页参数
    const skip = (current - 1) * size;
    
    // 逻辑删除过滤条件：只查询未删除的数据
    const notDeletedCondition = isNull(users.deletedAt);
    
    // 合并所有查询条件
    const allConditions = conditions.length > 0 
      ? and(...conditions, notDeletedCondition)
      : notDeletedCondition;

    
    // 定义要查询的字段
    const selectFields = {
      id: users.id,
      username: users.username,
      email: users.email,
      phone: users.phone,
      avatar: users.avatar,
      nickname: users.nickname,
      gender: users.gender,
      status: users.status,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    };
    
    // 优化：并行执行总数查询和数据查询，提高性能
    const [total, records] = await Promise.all([
      // 查询总数（只查询 id 字段，减少数据传输量）
      db.select({ id: users.id }).from(users).where(allConditions),
      
      // 查询分页数据（在数据库层面进行分页，而不是在应用层）
      db.select(selectFields).from(users).where(allConditions).limit(size).offset(skip)
    ]);
    
    return {
      records,
      total: total.length,
      current,
      size,
    };
  }

  findOne(id: number) {
    return db.select({
      id: users.id,
      username: users.username,
      email: users.email,
      phone: users.phone,
      avatar: users.avatar,
      nickname: users.nickname,
      gender: users.gender,
      status: users.status,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    }).from(users).where(and(eq(users.id, id), isNull(users.deletedAt)));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 检查用户是否存在（只查询未删除的）
    const existingUser = await db.select()
      .from(users)
      .where(and(eq(users.id, id), isNull(users.deletedAt)));
    if (existingUser.length === 0) {
      throw new NotFoundException('用户不存在');
    }

    // 如果更新用户名，检查新用户名是否已存在（只检查未删除的）
    if (updateUserDto.username && updateUserDto.username !== existingUser[0].username) {
      const userWithSameUsername = await db.select()
        .from(users)
        .where(and(eq(users.username, updateUserDto.username), isNull(users.deletedAt)));
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
    if (updateUserDto.gender !== undefined) {updateData.gender = updateUserDto.gender;}
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
      gender: users.gender,
      status: users.status,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    }).from(users).where(and(eq(users.id, id), isNull(users.deletedAt)));

    return updatedUser[0];
  }

  async remove(id: number) {
    // 检查用户是否存在（只查询未删除的）
    const existingUser = await db.select()
      .from(users)
      .where(and(eq(users.id, id), isNull(users.deletedAt)));
    
    if (existingUser.length === 0) {
      throw new NotFoundException('用户不存在');
    }

    // 逻辑删除：设置 deletedAt 时间戳
    await db.update(users)
      .set({ deletedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(users.id, id));

    return { message: '用户删除成功' };
  }
}
