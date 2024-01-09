import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TypesService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(createTypeDto: CreateTypeDto) {
    return this.prismaService.type.create({data: createTypeDto});
  }

  async getTypes() {
    return this.prismaService.type.findMany();
  }

  async getTypeById(id: number) {
    const type = await this.prismaService.type.findUnique({where: {id}});
    if (!type) {
      throw new Error('Type not found');
    }
    return type;
  }

  async updateType(id: number, updateTypeDto: UpdateTypeDto) {
    try {
      return await this.prismaService.type.update(
        {where: {id}, data: updateTypeDto}
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteType(id: number) {
    try {
      return this.prismaService.type.delete({where: {id}});
    } catch (error) {
      throw error;
    }
  }
}
