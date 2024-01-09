import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';
@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.orderDetails)
    product: Product;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @ManyToOne(() => Order, (order) => order.orderDetails)
    order: Order;
}
