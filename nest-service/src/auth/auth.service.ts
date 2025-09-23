import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserAuthDto } from "./dto/user-auth.dto";

import { users } from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";

@Injectable()
export class AuthService {
  async login(userAuthDto: UserAuthDto) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, userAuthDto.username))
      .limit(1);
    if (user.length === 0) {
      throw new UnauthorizedException("用户不存在");
    }
    if (user[0].password !== userAuthDto.password) {
      throw new UnauthorizedException("用户名或密码错误");
    }
    const { password: _, ...userWithoutPassword } = user[0];
    return {
      success: true,
      message: "登录成功",
      data: userWithoutPassword,
    };
  }
}
