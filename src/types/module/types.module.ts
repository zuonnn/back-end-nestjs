import { Module } from '@nestjs/common';
import { TypesService } from '../service/types.service';
import { TypesController } from '../controller/types.controller';
import { PrismaModule } from 'src/prisma/module/prisma.module';

@Module({
  controllers: [TypesController],
  providers: [TypesService],
  imports: [PrismaModule],
})
export class TypesModule {}
