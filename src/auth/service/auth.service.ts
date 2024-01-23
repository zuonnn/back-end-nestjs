import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/model/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { Request, Response } from 'express';
import { TokenPayload } from '../guard/token-payload.interface';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) { }
  public async register(userDto: CreateUserDto) {
    try {
      const user = await this.usersService.createUser(userDto);
      return {
        message: `User ${userDto.email} registered successfully`,
        user,
      };
    } catch (error) {
      throw new HttpException('Registration failed ' + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async login(loginDto: LoginDto, res: Response) {
    try {
      let user: User;
      if (this.isEmail(loginDto.account)) {
        user = await this.usersService.getUserByEmail(loginDto.account);
      } else {
        user = await this.usersService.getUserByPhone(loginDto.account);
      }

      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
      }

      const isPasswordMatching = await bcrypt.compare(loginDto.password, user.password);
      if (!isPasswordMatching) {
        throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
      }

      const payload: TokenPayload = { id: user.id, role: user.role };
      const accessToken = this.generateAccessToken(payload);
      const refreshToken = this.generateRefreshToken(payload);

      res.cookie('access_token', accessToken, {
        maxAge: 1000 * 3600,
      });

      res.cookie('refresh_token', refreshToken, {
        maxAge: 1000 * 3600 * 24,
      });

      return user;
    } catch (error) {
      throw new HttpException('Login failed ' + error, HttpStatus.UNAUTHORIZED);
    }
  }

  private isEmail(account: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(account);
  }

  private generateAccessToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION_TIME')
    });
  }

  private generateRefreshToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION_TIME')
    });
  }

  public async refreshTokens(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies['refresh_token'];

      if (!refreshToken) {
        throw new HttpException('No refresh token found', HttpStatus.UNAUTHORIZED);
      }

      const decoded = this.jwtService.verify(refreshToken);
      if (!decoded) {
        throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
      }

      const user = await this.usersService.getUserById(decoded.id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }

      const accessTokenPayload: TokenPayload = { id: user.id, role: user.role };
      const newAccessToken = this.generateAccessToken(accessTokenPayload);

      res.cookie('access_token', newAccessToken, {
        maxAge: 1000 * 3600,
      });

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new HttpException('Token refresh failed ' + error, HttpStatus.UNAUTHORIZED);
    }
  }

  public async getUserFromAccessToken(token: string) {
    const payload: TokenPayload = this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET')
    })
    if (payload.id) {
      return this.usersService.getUserById(payload.id);
    }
  }
}
