import { Controller, Delete, Get, Post, Req, Res, Body, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartDto } from './dto/cart.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/guard/role.decorators';
import { Role } from '@prisma/client';

@Controller('carts')
@UseGuards(JwtAuthGuard, RoleGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }

  @Post('add')
  @Roles(Role.customer)
  addToCart(@Body() cartDto: CartDto, @Req() req, @Res() res) {
    this.cartsService.addToCart(cartDto, req.session);
    return res.send('Product added to cart');
  }

  @Get()
  @Roles(Role.customer)
  getCart(@Req() req) {
    return this.cartsService.getCart(req.session);
  }

  @Delete('clear')
  @Roles(Role.customer)
  clearCart(@Req() req, @Res() res) {
    this.cartsService.clearCart(req.session);
    return res.send('Cart cleared');
  }
}