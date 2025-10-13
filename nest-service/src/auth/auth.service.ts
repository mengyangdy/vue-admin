import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UserAuthDto } from "./dto/user-auth.dto";

import { users } from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  @Inject(JwtService)
  private jwtService: JwtService;
  async register(registerDto: RegisterDto) {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, registerDto.username));
    if (existingUser.length > 0) {
      throw new ConflictException("用户名已存在");
    }

    const hashedPassword = await argon2.hash(registerDto.password);
    const result = await db.insert(users).values({
      username: registerDto.username,
      password: hashedPassword,
      phone: registerDto.phone,
      email: registerDto.email,
      nickname: registerDto.nickname,
      avatar: registerDto.avatar,
    });
    // 返回创建的用户信息（不包含密码）
    const newUser = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        phone: users.phone,
        avatar: users.avatar,
        nickname: users.nickname,
        status: users.status,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, result[0].insertId));

    // return newUser[0];
    return {
      success: true,
      message: "注册成功",
    };
  }
  async login(userAuthDto: UserAuthDto) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, userAuthDto.username))
      .limit(1);
    console.log("🚀 ~ AuthService ~ login ~ user:", user);
    if (user.length === 0) {
      throw new UnauthorizedException("用户不存在");
    }
    let isPasswordValid = await argon2.verify(
      user[0].password,
      userAuthDto.password
    );
    console.log("🚀 ~ AuthService ~ login ~ isPasswordValid:", isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException("用户名或密码错误");
    }
    return user[0].id;
  }
  async getUserInfo(id: number) {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (user.length === 0) {
      throw new UnauthorizedException("用户不存在");
    }

    const { password: _, ...userWithoutPassword } = user[0];
    return {
      msg: "登录成功",
      data: userWithoutPassword,
    };
  }
  async refreshToken(refreshToken: string) {
    try {
      // 验证 refresh token，如果过期会抛出异常
      const data = this.jwtService.verify(refreshToken);

      // 如果验证成功，data 包含：{ userId: number, iat: number, exp: number }
      const userId = data.userId;

      const token = this.jwtService.sign(
        {
          userId: userId,
        },
        {
          expiresIn: "1m",
        }
      );
      const refresh_token = this.jwtService.sign(
        {
          userId: userId,
        },
        {
          expiresIn: "7d",
        }
      );

      return {
        token,
        refresh_token,
      };
    } catch (error) {
      // refresh token 无效或已过期
      throw new UnauthorizedException("Refresh token 已过期，请重新登录");
    }
  }
}
