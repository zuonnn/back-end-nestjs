import { Injectable } from '@nestjs/common';
import { CartDto } from '../dto/cart.dto';

@Injectable()
export class CartsService {
  addToCart(cartDto: CartDto, session: Record<string, any>) {
    if (!session.cart) {
      session.cart = [];
    }
    
    const existingProduct = session.cart.find((item) => item.productId === cartDto.productId);

    if (existingProduct) {
      existingProduct.quantity += cartDto.quantity;
    } else {
      session.cart.push(cartDto);
    }
  }

  getCart(session: Record<string, any>) {
    return session.cart || [];
  }

  clearCart(session: Record<string, any>) {
    session.cart = [];
  }
}