import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatchedPassword = await this.usersService.compareHashedValues(pass, user.password);
    if (!isMatchedPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
