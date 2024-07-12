import { EventsByUserController } from '../../../../src/resources/events-by-user/events-by-user.controller';
import { EventsByUserService } from '../../../../src/resources/events-by-user/events-by-user.service';
import { TestBed } from '@automock/jest';
import { mockedDateRangeDto, mockedEventByUser } from '../../../shared/event-by-user';
import { mockUser } from '../../../shared/users';
import { DeleteResult } from 'typeorm';

describe('EventsByUserController', () => {
    let controller: EventsByUserController;

    let eventByUserService: jest.Mocked<EventsByUserService>;

    beforeAll(async () => {
        const { unit, unitRef } = TestBed.create(EventsByUserController).compile();
        controller = unit;
        eventByUserService = unitRef.get(EventsByUserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call eventByUserService.getEventsByMonth', async () => {
        const mockResponse = [mockedEventByUser];

        jest.spyOn(eventByUserService, 'getEventsByMonth').mockResolvedValue(mockResponse);

        const result = await controller.getEventsByMonth(mockUser, mockedDateRangeDto);
        expect(eventByUserService.getEventsByMonth).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    });

    it('should call eventByUserService.getAbsentToday', async () => {
        const mockResponse = [mockedEventByUser];

        jest.spyOn(eventByUserService, 'getAbsentToday').mockResolvedValue(mockResponse);

        const result = await controller.getAbsentToday(mockUser);
        expect(eventByUserService.getAbsentToday).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    });

    it('should call eventByUserService.create', async () => {
        const mockResponse = mockedEventByUser;

        jest.spyOn(eventByUserService, 'create').mockResolvedValue(mockResponse);

        const result = await controller.create(mockedEventByUser, mockUser);
        expect(eventByUserService.create).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    });
    it('should call eventByUserService.update', async () => {
        const mockResponse = mockedEventByUser;

        jest.spyOn(eventByUserService, 'update').mockResolvedValue(mockResponse);

        const result = await controller.update(1, mockedEventByUser);
        expect(eventByUserService.update).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    });
    it('should call eventByUserService.delete', async () => {
        const mockResponse = { affected: 1 } as DeleteResult;

        jest.spyOn(eventByUserService, 'delete').mockResolvedValue(mockResponse);

        const result = await controller.delete(1);
        expect(eventByUserService.delete).toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    });
});
