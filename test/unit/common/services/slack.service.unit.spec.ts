import { SlackService } from '../../../../src/common/services/slack/slack.service';
import { TestBed } from '@automock/jest';
import { ChatPostMessageResponseMessage } from '@slack/web-api/dist/types/response/ChatPostMessageResponse';
import { WebClient } from '@slack/web-api';

describe('SlackService', () => {
  let service: SlackService;
  let webClient: WebClient;

  beforeAll(async () => {
        webClient = new WebClient();
        const { unit, unitRef } = TestBed.create(SlackService).compile();
        service = unit;
    });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should call send', async () => {
    const mockResponse: ChatPostMessageResponseMessage = {
      app_id: 'test',
    };
    jest.spyOn(service, 'send').mockResolvedValue(mockResponse);

    const result = await service.send('test', {
      title: 'test',
      color: 'test',
      channel: 'test',
    });
    expect(service.send).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
  it('should call sendError', async () => {
    const mockResponse: ChatPostMessageResponseMessage = {
      app_id: 'test',
    };
    jest.spyOn(service, 'sendError').mockResolvedValue(mockResponse);

    const result = await service.sendError('test');
    expect(service.sendError).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
  it('should call sendWarning', async () => {
    const mockResponse: ChatPostMessageResponseMessage = {
      app_id: 'test',
    };
    jest.spyOn(service, 'sendWarning').mockResolvedValue(mockResponse);

    const result = await service.sendWarning('test');
    expect(service.sendWarning).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
  it('should call sendInfo', async () => {
    const mockResponse: ChatPostMessageResponseMessage = {
      app_id: 'test',
    };
    jest.spyOn(service, 'sendInfo').mockResolvedValue(mockResponse);

    const result = await service.sendInfo('test');
    expect(service.sendInfo).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

});
