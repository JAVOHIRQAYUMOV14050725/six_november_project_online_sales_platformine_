import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('translations')
export class Translation {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({ type: 'varchar', length: 10 })
    language_code: string; // Til kodi (masalan, 'en', 'ru', 'uz')

    @Column({ type: 'varchar', length: 255 })
    key: string; // Tarjima kaliti (masalan, 'greeting', 'welcome_message')

    @Column({ type: 'text' })
    value: string; // Tarjimasi

    @CreateDateColumn()
    created_at: Date; // Yaratilgan vaqt

    @UpdateDateColumn()
    updated_at: Date; // Yangilangan vaqt
}
