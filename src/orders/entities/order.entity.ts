import { OrderTracking } from "../../order_tracking/entities/order_tracking.entity";
import { OrderStatus } from "../../order_statuses/entities/order_status.entity";
import { User } from "../../users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from "typeorm";
import { OrderItem } from "../../order_items/entities/order_item.entity";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_price: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => OrderTracking, orderTracking => orderTracking.order)
    orderTrackings: OrderTracking[];

    @OneToMany(() => OrderItem, orderItems => orderItems.order)
    orderItems: OrderItem[];

    @ManyToMany(() => User, user => user.orders, { onDelete: 'CASCADE' })
    users: User[];

    @ManyToMany(() => OrderStatus, orderStatus => orderStatus.orders, { onDelete: 'CASCADE' })
    statuses: OrderStatus[];
    orderStatus: any;
}
