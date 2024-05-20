import { BaseAbstractRepository } from '../../repositories/base/base.abstract.repository';
import { BaseInterfaceService } from './base.interface.service';
import { Users } from '../../../resources/users/entities/Users';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class BaseAbstractService<T> implements BaseInterfaceService{
  protected readonly currentRepository: any;
  private readonly logger = new Logger(this.constructor.name);
  protected constructor(private readonly baseAbstractRepository: BaseAbstractRepository<T>) { }

  findOneByCondition(options: any): Promise<T> {
    try {
      return this.baseAbstractRepository.findOneByCondition(options);
    } catch (e) {
      this.logger.error(`findOneByCondition: ${JSON.stringify(options)}, class: ${this.constructor.name}. Message: ${e.message}`);
      throw new NotFoundException(`Cannot find the entity for - ${JSON.stringify(options)}`);
    }
  }

  create(data: T): Promise<T> {
    return this.baseAbstractRepository.create(data);
  }

  delete(id: number): Promise<T> {
    return Promise.resolve(undefined);
  }

   findAll(): Promise<T[]> {
    return this.baseAbstractRepository.findAll();
  }

  async findOneById(id: number, user: Users): Promise<T> {
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
        this.logger.error(`findOneById: ${id}. Class: ${this.constructor.name} Message: ${e.message}`);
        throw new NotFoundException(`Cannot find an entity for ${id}`);
    }
  }

  update(data: T): Promise<T> {
    return Promise.resolve(undefined);
  }
}
