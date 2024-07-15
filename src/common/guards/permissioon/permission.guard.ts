import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permission.decorator';
import { Permission } from './permission.enum';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor (private reflector: Reflector) {}
    async canActivate (context: ExecutionContext): Promise<boolean> {
        const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPermissions) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user){
            return false;
        }
        if (user.role === 'admin') {
            return true;
        }
        const body = request.body;

        if (requiredPermissions.includes(Permission.UserId)){
            if (body?.userId) {
                if (body.userId !== user.id) {
                    return false;
                }
            }
        }

        if (requiredPermissions.includes(Permission.Id)){
            if (request.params?.id && body?.id) {
                if (+request.params.id !== body.id) {
                    return false;
                }
            }
        }

        return true;
    }
}
