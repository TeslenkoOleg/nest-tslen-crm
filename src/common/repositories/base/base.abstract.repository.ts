import { BaseInterfaceRepository } from './base.interface.repository';
import { DeepPartial, DeleteResult, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T>{
    protected repository: Repository<T>;
    constructor (entity: Repository<T>) {
        this.repository = entity;
    }

    findOne (id: number): Promise<T> {
        return this.repository.findOne({ where: { id } as unknown as FindOptionsWhere<T> });
    }
    async create (data: DeepPartial<T>): Promise<T> {
        return await this.repository.save(data);
    }

    async delete (id: number): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

    public async findAll (): Promise<T[]> {
        return await this.repository.find();
    }

    public async findOneByCondition (options: FindOptionsWhere<T>): Promise<T> {
        return await this.repository.findOne(options);
    }

    findWithRelations (relations: FindManyOptions<T>): Promise<T[]> {
        return Promise.resolve([]);
    }

    public async save (data: DeepPartial<T>): Promise<T> {
        return await this.repository.save(data);
    }

}
