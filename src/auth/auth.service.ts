import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { TokenPayload } from './guard/token-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) { }
    public async register(userDto: CreateUserDto) {
        try {
            const userInDb = await this.usersService.getUserByEmail(userDto.email);
            if (userInDb) {
                throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(userDto.password, 10);

            const createdUser = await this.usersService.createUser({
                ...userDto,
                password: hashedPassword,
            });
            return createdUser;
        }
        catch (error) {
            throw error;
        }
    }

    public async login(loginDto: LoginDto, res: Response) {
        try {
            const user = await this.usersService.getUserByEmail(loginDto.email);
            if (!user) {
                throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
            }

            const isPasswordMatching = await bcrypt.compare(loginDto.password, user.password);
            if (!isPasswordMatching) {
                throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
            }

            const accessToken = this.generateAccessToken({ id: user.id, role: user.role });
            const refreshToken = this.generateRefreshToken({ id: user.id, role: user.role });

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

    private generateAccessToken(payload: TokenPayload) {
        return this.jwtService.sign(payload, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME });
      }
    
      private generateRefreshToken(payload: TokenPayload) {
        return this.jwtService.sign(payload, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME });
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
}
