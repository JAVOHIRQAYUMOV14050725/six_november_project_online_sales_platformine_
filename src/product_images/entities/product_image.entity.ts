import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity'; 

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.productImages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })  
    product: Product;

    @Column({ unique: true })
    imageUrl: string; 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
