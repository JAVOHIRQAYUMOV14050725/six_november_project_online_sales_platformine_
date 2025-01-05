import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('activity_logs')
export class ActivityLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.activityLogs, { onDelete: 'CASCADE' }) 
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ length: 255 })
    action: string;

    @CreateDateColumn({ name: 'timestamp' })
    timestamp: Date;
}
