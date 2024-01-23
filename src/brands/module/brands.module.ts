import { Module } from '@nestjs/common';
import { BrandsService } from '../service/brands.service';
import { BrandsController } from '../controller/brands.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  imports: [PrismaModule],
})
export class BrandsModule {}
