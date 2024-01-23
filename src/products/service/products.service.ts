import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { CreateProductDto } from '../model/dto/create-product.dto';
import { UpdateProductDto } from '../model/dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({ data: createProductDto });
  }

  async getProducts() {
    return this.prismaService.product.findMany();
  }

  async getProductsById(id: number) {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({ where: { id }, data: updateProductDto });
  }

  async removeProduct(id: number) {
    return this.prismaService.product.delete({ where: { id } });
  }
}