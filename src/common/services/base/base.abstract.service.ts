import { BaseAbstractRepository } from '../../repositories/base/base.abstract.repository';
import { BaseInterfaceService } from './base.interface.service';
import { Users } from '../../../resources/users/entities/Users';

export abstract class BaseAbstractService<T> implements BaseInterfaceService{
  protected currentRepository: any;
  protected constructor(private readonly baseAbstractRepository: BaseAbstractRepository<T>) { }

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

  async findOneById(id: number, user: Users): Promise<T> {
    try {
      let result: any;
      if ('getOneWithRelations' in this.currentRepository) {
        result = await this.currentRepository.getOneWithRelations(id, user);
      }
      else {
        result = await this.baseAbstractRepository.findOne(id);
      }
      return result;
    } catch (e) {
        console.log('error', e);
        return {} as T;
    }
  }

  update(data: T): Promise<T> {
    return Promise.resolve(undefined);
  }
}
