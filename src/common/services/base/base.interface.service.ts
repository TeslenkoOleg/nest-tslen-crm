
import { FindOptionsWhere } from 'typeorm';
import { Users } from '../../../resources/users/entities/Users';

export interface BaseInterfaceService {
  create(data: any): Promise<any>;
  delete(id: number): Promise<any>;
  findAll(): Promise<any[]>;
  findOneById(id: number, user: Users): Promise<any>;
  findOneByCondition(options: FindOptionsWhere<any>): Promise<any>;
  update(data: any): Promise<any>;

}
