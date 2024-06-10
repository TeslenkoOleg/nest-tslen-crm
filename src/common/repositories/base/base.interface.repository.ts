import { DeepPartial, FindManyOptions } from 'typeorm';

export interface BaseInterfaceRepository<T> {
    create(data: DeepPartial<T>): Promise<T>;
    save(data: T): Promise<T>;
    delete(id: number): Promise<boolean>;
    findAll(): Promise<T[]>;
    findOne(id: any): Promise<T>;
    findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;
}
