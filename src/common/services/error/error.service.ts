import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SlackService } from '../slack/slack.service';

@Injectable()
export class ErrorService {
    private readonly logger = new Logger(this.constructor.name);
    constructor (private readonly slackService: SlackService) {}
    async aggregateError (loggerMsg: string, slackMsg: string = null, throwError: IThrowErrorObject = null): Promise<void> {
        if (loggerMsg) this.logger.error(loggerMsg);
        if (slackMsg) await this.slackService.sendError(slackMsg);
        if (throwError && throwError.method) {
            if (throwError.method === ErrorExceptionMethod.NotFound){
                throw new NotFoundException(throwError.message)
            }
        }
    }
}
export enum ErrorExceptionMethod {
    NotFound = 'NotFound'
}
export interface IThrowErrorObject {
    method: ErrorExceptionMethod,
    message: string
}
