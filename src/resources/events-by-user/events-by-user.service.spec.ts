import { Test, TestingModule } from '@nestjs/testing';
import { EventsByUserService } from './events-by-user.service';

describe('EventsByUserService', () => {
    let service: EventsByUserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EventsByUserService],
        }).compile();

        service = module.get<EventsByUserService>(EventsByUserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
