import { BaseInterfaceRepository } from './base.interface.repository';
import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T>{
  private entity: Repository<T>;
  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }
  async create(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }

  delete(id: number): Promise<boolean> {
    return Promise.resolve(false);
  }

  findAll(): Promise<T[]> {
    return this.entity.find();
  }

  public async findOneByCondition(filterCondition: FindOptionsWhere<T>): Promise<T> {
    return await this.entity.findOneBy(filterCondition);
  }

  findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return Promise.resolve([]);
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }

  update(data: DeepPartial<T>): T {
    return undefined;
  }

}
