import { IsNumberString } from 'class-validator';

export class OneNumberParams {
  @IsNumberString()
      id: number;
}
