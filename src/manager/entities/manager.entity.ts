// manager.entity.ts
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, JoinColumn } from 'typeorm';


@Entity()
export class Manager {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @Column({ length: 100 })
    store_name: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Company, (company) => company.managers, { onDelete: 'CASCADE' })
    companies: Company[];

    @ManyToOne(() => User, (user) => user.manager, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    users: User;
}
