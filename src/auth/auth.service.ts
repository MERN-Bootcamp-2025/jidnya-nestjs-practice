import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    return this.users.create(dto);
  }

  async login(dto: LoginDto) {
    const user = await this.users.verifyPassword(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwt.signAsync(payload);

    // destructuringonly what you need
    const { passwordHash, ...safe } = user;
    void passwordHash; // explicitly tell TS "I’m ignoring this"

    return { access_token, user: safe };
  }
}
