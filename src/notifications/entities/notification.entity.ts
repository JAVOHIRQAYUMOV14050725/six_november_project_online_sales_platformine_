import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' }) 
    @JoinColumn({ name: 'user_id' })
    user: User; 

    @Column('text')
    message: string;

    @Column({ default: false })
    read: boolean; 

    @CreateDateColumn()
    createdAt: Date; 

    @UpdateDateColumn()
    updatedAt: Date;
}
