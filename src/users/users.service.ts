import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({data: createUserDto}); 
  }

  getUsers() {
    return this.prismaService.user.findMany();
  }

  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({where: {email}});
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({where: {id}});
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  removeUser(id: number) {
    return `This action removes a #${id} user`;
  }
}
