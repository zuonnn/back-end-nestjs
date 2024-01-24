import { Message } from 'src/chat/model/message.entity';
import { Order } from 'src/orders/model/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  dob: Date;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ default: 'customer' })
  role: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => Message, message => message.user)
  messages: Message[];
}
