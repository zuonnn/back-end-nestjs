import { Module } from '@nestjs/common';
import { EmailsService } from '../service/emails.service';

@Module({
  providers: [EmailsService]
})
export class EmailsModule {}
