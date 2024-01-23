import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async createCategory(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({data: createCategoryDto});
  }

  async getCategories() {
    return this.prismaService.category.findMany();
  }

  async getCategoryById(id: number) {
    const category = await this.prismaService.category.findUnique({where: {id}});
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prismaService.category.update(
        {where: {id}, data: updateCategoryDto}
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id: number) {
    try {
      return this.prismaService.category.delete({where: {id}});
    } catch (error) {
      throw error;
    }
  }
}
