
import { EventsByUserSubscriber } from '../../../../src/resources/events-by-user/subscribers/events-by-user.subscriber';
import { DataSource, UpdateEvent } from 'typeorm';
import { Test } from '@nestjs/testing/test';
import {  mockedEventByUser } from '../../../shared/event-by-user';
import { EventsByUser } from '../../../../src/resources/events-by-user/entities/events-by-user.entity';

describe('EventsByUserSubscriber Unit Test', () => {
    let subscriber: EventsByUserSubscriber;
    // datasource is a mock
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                EventsByUserSubscriber,
                {
                    provide: DataSource,
                    useValue: { subscribers: [] },
                },
            ],
        }).compile();
        subscriber = moduleRef.get<EventsByUserSubscriber>(EventsByUserSubscriber);
    });
    it('should be defined', () => {
        expect(subscriber).toBeDefined();
    });
    it('should listen to EventsByUser', () => {
        expect(subscriber.listenTo()).toBe(EventsByUser);
    });
    it('should call afterUpdate', async () => {
        const event = {
            manager: {
                increment: jest.fn(),
            },
            databaseEntity: mockedEventByUser,
            entity: mockedEventByUser,
        } as unknown as UpdateEvent<EventsByUser>;
        jest.spyOn(subscriber, 'afterUpdate');
        await subscriber.afterUpdate(event);
        expect(subscriber.afterUpdate).toHaveBeenCalledTimes(1);
        expect(subscriber.afterUpdate).toHaveBeenCalledWith(event);
    });
})
