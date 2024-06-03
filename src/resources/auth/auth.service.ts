import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/signIn.response.dto';
import { SignInDto } from './dto/signIn.dto';
import { Users } from '../users/entities/Users';
@Injectable()
export class AuthService {
    constructor (
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

    async signIn (email: SignInDto['email'], pass: SignInDto['password']): Promise<SignInResponseDto> {
        const user: Users = await this.usersService.findOneByCondition({ where: { email } });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const isMatchedPassword: boolean = await this.usersService.compareHashedValues(pass, user.password);
        if (!isMatchedPassword) {
            throw new UnauthorizedException('Invalid password');
        }
        const payload: {user: Users} = { user };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
