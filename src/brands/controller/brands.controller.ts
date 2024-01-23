import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BrandsService } from '../service/brands.service';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { Brand } from '@prisma/client';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.createBrand(createBrandDto);
  }

  @Get()
  findAll() : Promise<Brand[]>{
    return this.brandsService.getBrands();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<Brand> {
    return this.brandsService.getBrandById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.updateBrand(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.deleteBrand(+id);
  }
}
