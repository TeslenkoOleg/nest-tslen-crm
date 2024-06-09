
import { FindOptionsWhere } from 'typeorm';
import { Users } from '../../../resources/users/entities/users.entity';

export interface BaseInterfaceService {
  create(data: any): Promise<any>;
  delete(id: number): Promise<any>;
  findAll(user: Users): Promise<any[]>;
  findOneById(id: number, user: Users): Promise<any>;
  findOneByCondition(options: FindOptionsWhere<any>): Promise<any>;
  update(data: any): Promise<any>;

}
