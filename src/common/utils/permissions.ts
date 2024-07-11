import { Users } from '../../resources/users/entities/users.entity';
import { Role } from '../guards/roles/role.enum';

export function hasPermissionById (userId: number, entityUserId: number, user: Users,) {
    if (!entityUserId) {
        return false
    }
    if (user.role === Role.Admin){
        return true;
    }
    if (entityUserId === userId) {
        return true;
    }
    return false;

}
