import { Injectable, PipeTransform } from '@nestjs/common';
import { DatesRangeDto } from '../../../common/dto/dates-range.dto';
@Injectable()
export class DateStartEndPipe implements PipeTransform {
    async transform (date: string): Promise<DatesRangeDto> {
        const datesRangeDto = new DatesRangeDto();
        const convertedStr: string[] = date ? date.split('|') : [];
        datesRangeDto.startDate = new Date(convertedStr[0]);
        datesRangeDto.endDate = new Date(convertedStr[1]);
        return datesRangeDto;
    }

}
