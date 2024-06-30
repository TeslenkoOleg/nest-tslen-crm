import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor (
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector
    ) {}

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        let payload: any;
        try {
            payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.configService.get('JWT_SECRET'),
                }
            );
        } catch {
            throw new UnauthorizedException();
        }
        return requiredRoles.includes(payload.user?.role);
    }

    private extractTokenFromHeader (request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
