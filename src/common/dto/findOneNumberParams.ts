import {IsNumberString } from 'class-validator';

export class FindOneNumberParams {
  @IsNumberString()
  id: number;
}
