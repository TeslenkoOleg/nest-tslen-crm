
import { FindOptionsWhere } from 'typeorm';

export interface BaseInterfaceService {
  create(data: any): Promise<any>;
  delete(id: number): Promise<any>;
  findAll(): Promise<any[]>;
  findOneById(id: number): Promise<any>;
  findOneByCondition(options: FindOptionsWhere<any>): Promise<any>;
  update(data: any): Promise<any>;

}
