import { EventsByUserService } from '../../../../src/resources/events-by-user/events-by-user.service';
import { TestBed } from '@automock/jest';
import { mockedDateRangeDto, mockedEventByUser } from '../../../shared/event-by-user';
import { mockUser } from '../../../shared/users';

describe('EventsByUserService', () => {
    let service: EventsByUserService;

    beforeAll(() => {
        const { unit } = TestBed.create(EventsByUserService).compile();
        service = unit;
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should get events by month', async () => {
        const result = [mockedEventByUser]
        jest.spyOn(service, 'getEventsByMonth').mockResolvedValue(result);
        const res = await service.getEventsByMonth(mockUser, mockedDateRangeDto);
        expect(res).toEqual(result);
    });
    it('should get absent today', async () => {
        const result = [mockedEventByUser]
        jest.spyOn(service, 'getAbsentToday').mockResolvedValue(result);
        const res = await service.getAbsentToday(mockUser);
        expect(res).toEqual(result);
    });
});
