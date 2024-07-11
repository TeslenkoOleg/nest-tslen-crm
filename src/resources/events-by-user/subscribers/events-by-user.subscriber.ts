import { DataSource, EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { Logger } from '@nestjs/common';
import { EventsByUser } from '../entities/events-by-user.entity';
import { DaysOff } from '../../../common/entities/DaysOff';

@EventSubscriber()
export class EventsByUserSubscriber implements EntitySubscriberInterface<EventsByUser>{
    private readonly logger = new Logger(EventsByUserSubscriber.name);
    constructor (dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }
    listenTo () {
        return EventsByUser;
    }
    async afterUpdate (event: UpdateEvent<EventsByUser>) {
        const entityManager = event.manager;
        const databaseEntity = event.databaseEntity;
        const entity = event.entity;
        if (!databaseEntity || !entity) {
            return;
        }
        if (databaseEntity.isRequest) {
            // if the approving has been changed
            if (entity.approved !== databaseEntity.approved) {
                // if the request has been disapproved
                if (entity.approved === -1) {
                    this.logger.log(`Event ${entity.id} has been disapproved`);
                    await entityManager.increment(DaysOff, { userId: entity.userId }, entity.requestType, 1);
                }
            }
        }
    }
}
