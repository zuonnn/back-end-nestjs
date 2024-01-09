import { PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { User } from 'src/user/entities/user.entity';

export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerName: string;

    @Column()
    orderDate: Date;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
    orderDetails: OrderDetail[];

    @ManyToOne(() => User, user => user.orders)
    user: User;
}
