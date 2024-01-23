import { Module } from '@nestjs/common';
import { CheckoutsController } from '../controller/checkouts.controller';
import { CheckoutsService } from '../service/checkouts.service';

@Module({
  controllers: [CheckoutsController],
  providers: [CheckoutsService]
})
export class CheckoutsModule {}
