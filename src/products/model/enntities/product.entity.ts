import { Brand } from 'src/brands/model/entities/brand.entity';
import { Category } from 'src/categories/model/entities/category.entity';
import { OrderDetail } from 'src/orders/model/entities/order-detail.entity';
import { Type } from 'src/types/model/entities/type.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ type: 'float' })
    costPrice: number;
  
    @Column({ type: 'float' })
    retailPrice: number;
  
    @Column({ type: 'float' })
    wholeSalePrice: number;
  
    @Column()
    stock: number;
  
    @Column()
    image: string;
  
    @Column()
    brandId: number;
  
    @ManyToOne(() => Brand, brand => brand.products)
    brand: Brand;
  
    @Column()
    categoryId: number;
  
    @ManyToOne(() => Category, category => category.products)
    category: Category;
  
    @OneToMany(() => OrderDetail, orderDetail => orderDetail.product)
    orderDetails: OrderDetail[];
  
    @Column()
    typeId: number;
  
    @ManyToOne(() => Type, type => type.products)
    type: Type;
  }