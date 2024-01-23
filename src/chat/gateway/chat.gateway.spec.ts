import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { ChatService } from '../service/chat.service';
import { Message } from '@prisma/client';

describe('ChatGateway', () => {
  let chatGateway: ChatGateway;
  let chatService: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        { provide: ChatService, useValue: { sendMessage: jest.fn() } },
      ],
    }).compile();

    chatGateway = module.get<ChatGateway>(ChatGateway);
    chatService = module.get<ChatService>(ChatService);
  });

  it('should call ChatService.sendMessage and emit messageSent', async () => {
    const socketMock = { emit: jest.fn() };
    const payload = { fromId: 1, toId: 2, content: 'Hello' };
    const message: Message = {
      id: 1,
      content: payload.content,
      authorId: payload.fromId
    };

    jest.spyOn(chatService, 'sendMessage').mockResolvedValueOnce(message);

    await chatGateway.handleMessage(socketMock as any, payload);

    expect(chatService.sendMessage).toHaveBeenCalledWith(payload.fromId, payload.toId, payload.content);
    expect(socketMock.emit).toHaveBeenCalledWith('messageSent', message);
  });
});