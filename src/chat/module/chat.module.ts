import { Module } from '@nestjs/common';
import { ChatGateway } from '../gateway/chat.gateway';
import { ChatService } from '../service/chat.service';
import { AuthModule } from 'src/auth/module/auth.module';
import { PrismaService } from 'src/prisma/service/prisma.service';

@Module({
  providers: [ChatGateway, ChatService, PrismaService],
  imports: [AuthModule]
})
export class ChatModule {}
