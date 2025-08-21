import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return await this.auth.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.auth.login(dto);
  }
}
