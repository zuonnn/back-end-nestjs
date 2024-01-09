import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/categories/entities/category.entity';
import { OrderDetail } from 'src/orders/entities/order-detail.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Or} from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => Brand, brand => brand.products)
    brand: Brand;

    @ManyToOne(() => Category, category => category.products)
    category: Category;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.product)
    orderDetails: OrderDetail[];
}
