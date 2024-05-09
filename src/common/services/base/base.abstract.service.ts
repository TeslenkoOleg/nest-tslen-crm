import { BaseAbstractRepository } from '../../repositories/base/base.abstract.repository';
import { BaseInterfaceService } from './base.interface.service';
import { BaseEntity, DeepPartial, FindOptionsWhere } from 'typeorm';

export abstract class BaseAbstractService<T> implements BaseInterfaceService{
  constructor(private readonly baseAbstractRepository: BaseAbstractRepository<T>) { }

  findOneByCondition(options: any): Promise<T> {
        return this.baseAbstractRepository.findOneByCondition(options);
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

  async findOneById(id: number | string): Promise<T> {
    return await this.baseAbstractRepository.findOne(id);
  }

  update(data: T): Promise<T> {
    return Promise.resolve(undefined);
  }
}
