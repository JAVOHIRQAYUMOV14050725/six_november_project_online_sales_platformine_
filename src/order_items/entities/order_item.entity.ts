// order-item.entity.ts
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;

    @Column()
    product_id: number;

    @ManyToOne(() => Product, product => product.orderItems)
    product: Product;

    @Column()
    quantity: number;

    @Column('decimal')
    price: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
