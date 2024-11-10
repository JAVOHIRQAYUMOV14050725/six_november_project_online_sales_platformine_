import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { InventoryLocation } from '../../inventory_locations/entities/inventory_location.entity';

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.inventoryItems)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    quantity: number;

    @ManyToOne(() => InventoryLocation, (location) => location.inventoryItems)
    @JoinColumn({ name: 'location_id' })
    location: InventoryLocation;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
