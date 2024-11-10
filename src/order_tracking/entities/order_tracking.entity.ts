import { TrackingStatus } from "../../tracking_statuses/entities/tracking_status.entity";
import { Order } from "../../orders/entities/order.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity('order_tracking')
export class OrderTracking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column({ type: 'varchar', length: 255 })
    tracking_number: string;

    @ManyToOne(() => TrackingStatus)
    @JoinColumn({ name: 'status_id' })
    status: TrackingStatus;

    @Column({ type: 'timestamp', nullable: true })
    estimated_delivery: Date;

    @CreateDateColumn()
    created_at: Date;
}
