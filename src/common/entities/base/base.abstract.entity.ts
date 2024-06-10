import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseAbstractEntity<T>{
  @PrimaryGeneratedColumn()
      id: number;
  constructor (entity: Partial<T>) {
      Object.assign(this, entity);
  }
}
