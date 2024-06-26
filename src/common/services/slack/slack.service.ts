import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { ChatPostMessageResponseMessage } from '@slack/web-api/dist/types/response/ChatPostMessageResponse';
import { ConfigService } from '@nestjs/config';
const MESSAGE_TYPES: IMessageTypes = {
    error: {
        title: 'ERROR',
        color: 'danger',
        channel: '',
    },
    warning: {
        title: 'WARNING',
        color: 'warning',
        channel: '',
    },
    info: {
        title: 'INFO',
        color: 'good',
        channel: '',
    }
}
@Injectable()
export class SlackService {
    private web: WebClient;
    constructor (private configService: ConfigService) {
        this.web = new WebClient(this.configService.get('SLACK_BOT_TOKEN'));
        MESSAGE_TYPES.error.channel = this.configService.get('SLACK_CHANNEL_ERRORS');
        MESSAGE_TYPES.warning.channel = this.configService.get('SLACK_CHANNEL_WARNINGS');
        MESSAGE_TYPES.info.channel = this.configService.get('SLACK_CHANNEL_INFO');
    }
    async sendError (text: string) {
        return this.send(text, MESSAGE_TYPES.error);
    }
    async sendWarning (text: string) {
        return this.send(text, MESSAGE_TYPES.warning);
    }
    async sendInfo (text: string) {
        return this.send(text, MESSAGE_TYPES.info);
    }
    async send (text: string, messageType: IMessageTypes[keyof IMessageTypes]): Promise<ChatPostMessageResponseMessage> {
        return await this.web.chat.postMessage({
            text : messageType.title,
            channel: '#' + messageType.channel,
            attachments: [
                {
                    mrkdwn_in: ['text'],
                    color: messageType.color,
                    text: text,
                    ts: '' + Date.now(),
                }
            ]
        })
    }
}
interface IMessageTypes {
    error: {
        title: string,
        color: string,
        channel: string,
    },
    warning: {
        title: string,
        color: string,
        channel: string,
    },
    info: {
        title: string,
        color: string,
        channel: string,
    }
}
