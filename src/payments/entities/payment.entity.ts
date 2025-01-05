import { Order } from '../../orders/entities/order.entity';
import { PaymentStatus } from '../../payment_statuses/entities/payment_status.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, { eager: true })
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column({ type: 'varchar', length: 255 })
    payment_method: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @ManyToOne(() => PaymentStatus, { eager: true, onDelete: 'CASCADE' }) 
    @JoinColumn({ name: 'status_id' })
    status: PaymentStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
