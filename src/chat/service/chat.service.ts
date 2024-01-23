import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Message} from '@prisma/client';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/service/auth.service';
import { PrismaService } from 'src/prisma/service/prisma.service';

@Injectable()
export class ChatService {
    constructor(
        private readonly authService: AuthService,
        private readonly prismaService: PrismaService
    ) { }

    async getUserFromSocket(socket: Socket) {
        const cookie = socket.handshake.headers.cookie;
        const { accessToken: access_token } = parse(cookie);
        const user = await this.authService.getUserFromAccessToken(access_token);
        if (!user) {
            throw new WsException('Invalid credentials.');
        }
        return user;
    }

    async saveMessage(content: string, authorId: number) {
        const newMessage = await this.prismaService.message.create({
            data: {
                content,
                authorId,
            },
        });
        return newMessage;
    }

    async getAllMessages() {
        return this.prismaService.message.findMany({
            include: {
                author: true,
            },
        });
    }
    
    async sendMessage(fromId: number, toId: number, content: string): Promise<Message> {
        const fromUser = await this.prismaService.user.findUnique({ where: { id: fromId } });
        const toUser = await this.prismaService.user.findUnique({ where: { id: toId } });
      
        if (!fromUser || !toUser) {
          throw new Error('User not found');
        }
      
        if (fromUser.role !== 'customer' && fromUser.role !== 'customer_care') {
          throw new Error('Only customers and customer care can send messages');
        }
      
        if (toUser.role !== 'customer' && toUser.role !== 'customer_care') {
          throw new Error('Only customers and customer care can receive messages');
        }
      
        if (fromUser.role === 'customer' && toUser.role === 'customer') {
          throw new Error('Customers cannot message each other');
        }
      
        return this.prismaService.message.create({
          data: {
            content,
            authorId: fromId,
          },
        });
      }
}
