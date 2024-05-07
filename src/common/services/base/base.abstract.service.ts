import { BaseAbstractRepository } from '../../repositories/base/base.abstract.repository';
import { BaseInterfaceService } from './base.interface.service';
import { FindOptionsWhere } from 'typeorm';

export abstract class BaseAbstractService<T> implements BaseInterfaceService{
  constructor(private readonly baseAbstractRepository: BaseAbstractRepository<T>) { }

  create(data: T): Promise<T> {
    return this.baseAbstractRepository.create(data);
  }

  delete(id: number): Promise<T> {
    return Promise.resolve(undefined);
  }

   findAll(): Promise<T[]> {
    return this.baseAbstractRepository.findAll();
  }

  findOne(options: FindOptionsWhere<T>): Promise<T> {
    console.log('BaseAbstractService.findOneBy');
    return this.baseAbstractRepository.findOneByCondition(options);
  }

  update(data: T): Promise<T> {
    return Promise.resolve(undefined);
  }
}
