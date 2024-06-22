import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/signIn.response.dto';
import { SignInDto } from './dto/signIn.dto';
import { Users } from '../users/entities/users.entity';
import { SlackService } from '../../common/services/slack/slack.service';
@Injectable()
export class AuthService {
    constructor (
    private usersService: UsersService,
    private jwtService: JwtService,
    private slackService: SlackService
    ) {}

    async signIn (email: SignInDto['email'], pass: SignInDto['password']): Promise<SignInResponseDto> {
        const user: Users = await this.usersService.findOneByCondition({ where: { email } });

        if (!user) {
            const errorMessage = `signIn: ${email}, class: ${this.constructor.name}. Message: User not found`;
            await this.slackService.sendError(errorMessage);
            throw new UnauthorizedException(errorMessage);
        }
        const isMatchedPassword: boolean = await this.usersService.compareHashedValues(pass, user.password);
        if (!isMatchedPassword) {
            const errorMessage = `signIn: ${email}, class: ${this.constructor.name}. Message: Invalid password`;
            await this.slackService.sendError(errorMessage);
            throw new UnauthorizedException('Invalid password');
        }
        const payload: {user: Users} = { user };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
