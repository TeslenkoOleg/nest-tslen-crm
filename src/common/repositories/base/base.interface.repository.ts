import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';

export interface BaseInterfaceRepository<T> {
    create(data: DeepPartial<T>): Promise<T>;
    update(data: DeepPartial<T>): T;
    save(data: T): Promise<T>;
    delete(id: number): Promise<boolean>;
    findAll(): Promise<T[]>;
    findOneByCondition(filterCondition: FindOneOptions<T>): Promise<T>;
    findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;

}
