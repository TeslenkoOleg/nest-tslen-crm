import { BaseAbstractRepository } from '../../repositories/base/base.abstract.repository';
import { BaseInterfaceService } from './base.interface.service';
import { Users } from '../../../resources/users/entities/users.entity';
import { Logger, NotFoundException } from '@nestjs/common';
import { DeepPartial, DeleteResult } from 'typeorm';
import { SlackService } from '../slack/slack.service';

export abstract class BaseAbstractService<T> implements BaseInterfaceService{
    protected readonly currentRepository: any;
    protected readonly logger = new Logger(this.constructor.name);
    protected constructor (
      private readonly baseAbstractRepository: BaseAbstractRepository<T>,
      protected readonly slackService: SlackService
    ) { }

    async findOneByCondition (options: any): Promise<T> {
        try {
            return this.baseAbstractRepository.findOneByCondition(options);
        } catch (e) {
            const errorMessage = `findOneByCondition: ${JSON.stringify(options)}, class: ${this.constructor.name}. Message: ${e.message}`;
            this.logger.error(errorMessage);
            await this.slackService.sendError(errorMessage);
            throw new NotFoundException(`Cannot find the entity for - ${JSON.stringify(options)}`);
        }
    }
    async create (data: T, user: Users = null): Promise<T> {
        try {
            if ('createOneWithRelations' in this.currentRepository) {
                return this.currentRepository.createOneWithRelations(data, user);
            } else {
                return this.baseAbstractRepository.create(data);
            }
        } catch (e) {
            const errorMessage = `create. Class: ${this.constructor.name} Message: ${e.message}`;
            this.logger.error(errorMessage);
            await this.slackService.sendError(errorMessage);
            throw new NotFoundException(`Cannot create entity.`);
        }
    }

    async delete (id: number): Promise<DeleteResult> {
        const entity: T = await this.baseAbstractRepository.findOne(id);
        if (!entity) {
            this.logger.error(`delete. Class: ${this.constructor.name} Message: Cannot find an entity for ${id}`);
            throw new NotFoundException(`Cannot find an entity for ${id}`);
        }
        try {
            if ('deleteOneWithRelations' in this.currentRepository) {
                return this.currentRepository.deleteOneWithRelations(id, entity);
            }
            else {
                return this.baseAbstractRepository.delete(id);
            }
        } catch (e) {
            const errorMessage = `delete. Class: ${this.constructor.name} Message: ${e.message}`;
            this.logger.error(errorMessage);
            await this.slackService.sendError(errorMessage);
            throw new NotFoundException(`Cannot delete the entity.`);
        }
    }

    async findAll (user: Users): Promise<T[]> {
        try {
            if ('getByRole' in this.currentRepository) {
                return this.currentRepository.getByRole(user);
            }
            else {
                return this.baseAbstractRepository.findAll();
            }
        } catch (e) {
            const errorMessage = `findAll. Class: ${this.constructor.name} Message: ${e.message}`;
            this.logger.error(errorMessage);
            await this.slackService.sendError(errorMessage);
            throw new NotFoundException(`Cannot find all entities.`);
        }
    }

    async findOneById (id: number, user: Users): Promise<T> {
        try {
            let result: T;
            if ('getOneWithRelations' in this.currentRepository) {
                result = await this.currentRepository.getOneWithRelations(id, user);
            }
            else {
                result = await this.baseAbstractRepository.findOne(id);
            }
            return result;
        } catch (e) {
            const errorMessage = `findOneById: ${id}. Class: ${this.constructor.name} Message: ${e.message}`;
            this.logger.error(errorMessage);
            await this.slackService.sendError(errorMessage);
            throw new NotFoundException(`Cannot find an entity for ${id}`);
        }
    }

    async update (id: number, data: DeepPartial<T>): Promise<T> {
        const entity: T = await this.baseAbstractRepository.findOne(id);
        if (!entity) {
            this.logger.error(`update. Class: ${this.constructor.name} Message: Cannot find an entity for ${id}`);
            throw new NotFoundException(`Cannot find an entity for ${id}`);
        }
        const entityData: T = Object.assign(entity, data);
        try {
            if ('updateOneWithRelations' in this.currentRepository) {
                return this.currentRepository.updateOneWithRelations(entityData);
            }
            else {
                return this.baseAbstractRepository.save(entityData);
            }
        } catch (e) {
            const errorMessage = `update. Class: ${this.constructor.name} Message: ${e.message}`;
            this.logger.error(errorMessage);
            await this.slackService.sendError(errorMessage);
            throw new NotFoundException(`Cannot update the entity.`);
        }
    }
}
