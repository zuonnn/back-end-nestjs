import { Module } from '@nestjs/common';
import { CategoriesService } from '../service/categories.service';
import { CategoriesController } from '../controller/categories.controller';
import { PrismaModule } from 'src/prisma/module/prisma.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [PrismaModule]
})
export class CategoriesModule {}
