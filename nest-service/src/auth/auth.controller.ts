import {
  Controller,
  Post,
  Body,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserAuthDto } from "./dto/user-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() userAuthDto: UserAuthDto) {
    return this.authService.login(userAuthDto);
  }
}
