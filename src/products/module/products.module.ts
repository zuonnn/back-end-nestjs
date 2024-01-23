import { Module } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { ProductsController } from '../controller/products.controller';
import { PrismaModule } from 'src/prisma/module/prisma.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [PrismaModule]
})
export class ProductsModule {}
