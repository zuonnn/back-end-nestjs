import { Order } from "src/orders/entities/order.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../eum/role.enum";

export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public email: string;

    @Column()
    public phone: string;

    @Column()
    public password: string;

    @Column()
    public name: string;

    @Column()
    public dob: Date;

    @Column()
    public role: Role;

    @OneToMany(() => Order, order => order.user)
    public orders: Order[];
}
