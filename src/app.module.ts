import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BrandsModule } from './brands/module/brands.module';
import { CategoriesModule } from './categories/module/categories.module';
import { OrdersModule } from './orders/module/orders.module';
import { AuthModule } from './auth/module/auth.module';
import { ProductsModule } from './products/module/products.module';
import { PrismaService } from './prisma/service/prisma.service';
import { PrismaModule } from './prisma/module/prisma.module';
import { TypesModule } from './types/module/types.module';
import * as Joi from '@hapi/joi';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './users/module/users.module';
import { CartsService } from './carts/service/carts.service';
import { CartsModule } from './carts/module/carts.module';
import { CheckoutsModule } from './checkouts/module/checkouts.module';
import { ChatModule } from './chat/module/chat.module';
import { EmailsModule } from './emails/module/emails.module';
import { Brand121Module } from './brand121/brand121.module';
import { BranssadasModule } from './branssadas/branssadas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    BrandsModule,
    CategoriesModule,
    OrdersModule,
    AuthModule,
    ProductsModule,
    PrismaModule,
    TypesModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    UsersModule,
    CartsModule,
    CheckoutsModule,
    ChatModule,
    EmailsModule,
    Brand121Module,
    BranssadasModule,
  ],
  controllers: [],
  providers: [PrismaService, CartsService],
})
export class AppModule { }
