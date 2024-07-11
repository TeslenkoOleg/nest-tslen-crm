import { Test, TestingModule } from '@nestjs/testing';
import { EventsByUserController } from './events-by-user.controller';
import { EventsByUserService } from './events-by-user.service';

describe('EventsByUserController', () => {
    let controller: EventsByUserController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EventsByUserController],
            providers: [EventsByUserService],
        }).compile();

        controller = module.get<EventsByUserController>(EventsByUserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
