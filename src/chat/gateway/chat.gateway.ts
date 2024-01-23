import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../service/chat.service';

@WebSocketGateway(80)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) { }

  async handleConnection(socket: Socket) {
    await this.chatService.getUserFromSocket(socket);
  }

  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody() content: string,
    @ConnectedSocket() socket: Socket
  ) {
    const author = await this.chatService.getUserFromSocket(socket);
    const message = await this.chatService.saveMessage(content, author.id);

    this.server.sockets.emit('receive_message', message);

    return message;
  }

  @SubscribeMessage('request_all_messages')
  async requestAllMessages(
    @ConnectedSocket() socket: Socket
  ) {
    await this.chatService.getUserFromSocket(socket);
    const messages = await this.chatService.getAllMessages();
    socket.emit('send_all_messages', messages);
  }

  @SubscribeMessage('send_private_message')
  async handleMessage(socket: Socket, payload: { fromId: number, toId: number, content: string }): Promise<void> {
    const message = await this.chatService.sendMessage(payload.fromId, payload.toId, payload.content);
    socket.emit('messageSent', message);
  }

  async handleDisconnect(socket: Socket) {
    await this.chatService.getUserFromSocket(socket);
  }
}
