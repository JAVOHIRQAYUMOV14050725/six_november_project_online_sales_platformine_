import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('coupons')
export class Coupon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    code: string; 

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    discount_percentage: number; 

    @Column({ type: 'timestamp' })
    valid_from: Date; 

    @Column({ type: 'timestamp' })
    valid_to: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 
}
