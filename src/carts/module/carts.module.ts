import { Module } from '@nestjs/common';
import { CartsController } from '../controller/carts.controller';
import { CartsService } from '../service/carts.service';

@Module({
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule {}
