import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async createBrand(createBrandDto: CreateBrandDto) {
    return this.prismaService.brand.create({data: createBrandDto});
  }

  async getBrands() {
    return this.prismaService.brand.findMany();
  }

  async getBrandById(id: number) {
    const brand = await this.prismaService.brand.findUnique({where: {id}});
    if (!brand) {
      throw new Error('Brand not found');
    }
    return brand;
  }

  async updateBrand(id: number, updateBrandDto: UpdateBrandDto) {
    try {
      return await this.prismaService.brand.update(
        {where: {id}, data: updateBrandDto}
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteBrand(id: number) {
    try {
      return this.prismaService.brand.delete({where: {id}});
    } catch (error) {
      throw error;
    }
  }
}
