import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { User } from 'src/users/model/entities/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column({ type: 'timestamp' })
  orderDate: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  orderDetails: OrderDetail[];
}