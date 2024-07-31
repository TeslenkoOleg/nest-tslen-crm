import { BaseAbstractRepository } from '../../common/repositories/base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TaskProject } from './entities/task-project.entity';
import { Users } from '../users/entities/users.entity';
import { UpdateEventsByUserDto } from '../events-by-user/dto/update-events-by-user.dto';
import { UpdateTaskProjectDto } from './dto/update-task-project.dto';
import { TaskProjectPermission } from '../../common/entities/TaskProjectPermission';

export class TaskProjectRepository extends BaseAbstractRepository<TaskProject>{
    constructor (
    @InjectRepository(TaskProject)
    private readonly taskProjectRepository: Repository<TaskProject>,
    private entityManager: EntityManager
    ) {
        super(taskProjectRepository);
    }
    public async getByRole (user: Users): Promise<TaskProject[]>{
        const companyId = user.companyId;
        const userId = user.id;
        const qb = this.taskProjectRepository.createQueryBuilder('taskProject')
            .leftJoinAndSelect('taskProject.taskProjectPermissions', 'taskProjectPermission')
            .leftJoinAndSelect('taskProjectPermission.user', 'user')
            .andWhere(`taskProject.companyId = ${companyId}`)
            .andWhere(qb => {
                const subQuery = qb
                    .subQuery()
                    .select('1')
                    .from('taskProjectPermission', 'taskProjectPermission')
                    .where('taskProjectPermission.projectId = taskProject.id')
                    .andWhere(`taskProjectPermission.userId = ${userId}`)
                    .getQuery();
                return `EXISTS ${subQuery}`;
            });

        return await qb.getMany();
    }
    async getOneWithRelations (id: number, user: Users) {
        const companyId: number = user.companyId;
        return await this.taskProjectRepository.findOneOrFail({
            where: {
                id: id, companyId: companyId
            },
            relations: [
                'tasks',
                'tasks.taskAttachments',
                'tasks.phases',
                'tasks.orderInPhases',
                'taskProjectPermissions'
            ],
            order: {
                tasks: {
                    orderId: 'ASC'
                }
            }
        })
    }
}
