import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../model/dto/create-user.dto';
import { UpdateUserDto } from '../model/dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/service/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async createUser(createUserDto: CreateUserDto) {
    const userWithEmail = await this.prismaService.user.findUnique({ where: { email: createUserDto.email } });
    if (userWithEmail) {
      throw new HttpException(`User with email ${createUserDto.email} already exists`, HttpStatus.BAD_REQUEST);
    }

    const userWithPhone = await this.prismaService.user.findUnique({ where: { phone: createUserDto.phone } });
    if (userWithPhone) {
      throw new HttpException(`User with phone number ${createUserDto.phone} already exists`, HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  getUsers() {
    return this.prismaService.user.findMany();
  }

  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getUserByPhone(phone: string) {
    const user = await this.prismaService.user.findUnique({ where: { phone } });
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
