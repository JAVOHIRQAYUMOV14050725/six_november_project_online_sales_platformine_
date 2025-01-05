// address.entity.ts
import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToMany(() => User, user => user.addresses, { onDelete: 'CASCADE' })
    users: User[];

    @Column({ length: 255 })
    address_line1: string;

    @Column({ length: 255, nullable: true })
    address_line2: string;

    @Column({ length: 100 })
    city: string;

    @Column({ length: 100 })
    state: string;

    @Column({ length: 20 })
    postal_code: string;

    @Column({ length: 100 })
    country: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
