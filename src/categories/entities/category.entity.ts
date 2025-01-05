import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 , unique:true})
    name: string;

    @ManyToOne(() => Category, (category) => category.subCategories,  { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'parent_category_id' }) 
    parentCategory: Category;  

    @OneToMany(() => Category, (category) => category.parentCategory)
    subCategories: Category[];  

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
