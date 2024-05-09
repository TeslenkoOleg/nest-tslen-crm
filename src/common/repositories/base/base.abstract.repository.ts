import { BaseInterfaceRepository } from './base.interface.repository';
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { FindOneNumberParams } from '../../dto/findOneNumberParams';
export class BaseEntity {
  id: number;
}
export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T>{
  private repository: Repository<T>;
  protected constructor(entity: Repository<T>) {
    this.repository = entity;
  }

  findOne(id: number | string): Promise<T> {
        return this.repository.findOne({where: { id } as unknown as FindOptionsWhere<T>});
    }
  async create(data: DeepPartial<T>): Promise<T> {
    return await this.repository.save(data);
  }

  delete(id: number): Promise<boolean> {
    return Promise.resolve(false);
  }

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  public async findOneByCondition(options: FindOptionsWhere<T>): Promise<T> {
    return await this.repository.findOne(options);
  }

  findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return Promise.resolve([]);
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.repository.save(data);
  }

  update(data: DeepPartial<T>): T {
    return undefined;
  }

}
