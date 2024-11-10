import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payment_statuses')  
export class PaymentStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    status: string;  
}
