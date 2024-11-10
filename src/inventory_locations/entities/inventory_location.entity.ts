import { Inventory } from '../../inventory/entities/inventory.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class InventoryLocation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    location: string;  

    @OneToMany(() => Inventory, (inventory) => inventory.location) 
    inventoryItems: Inventory[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
