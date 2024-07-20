import { EventsByUser } from '../../src/resources/events-by-user/entities/events-by-user.entity';
import { DatesRangeDto } from '../../src/common/dto/dates-range.dto';
import { mockUser } from './users';

export const mockedEventByUser: EventsByUser = {
    id: 1,
    userId: 1,
    title: 'Test',
    start: null,
    end: null,
    primaryColor: 'red',
    secondaryColor: 'blue',
    isRequest: 1,
    approved: 1,
    comment: 'Test',
    requestType: 'Test',
    createdAt: null,
    timeOffset: 1,
    googleId: 'Test',
    isGoogleEvent: 1,
    googleMeetLink: 'Test',
    user: mockUser
}
export const mockedDateRangeDto: DatesRangeDto = {
    startDate: new Date(),
    endDate: new Date()
};
