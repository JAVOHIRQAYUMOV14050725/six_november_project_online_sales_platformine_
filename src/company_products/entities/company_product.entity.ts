// company-product.entity.ts
import { Company } from '../../companies/entities/company.entity';
import { Product } from '../../products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';


@Entity()
export class CompanyProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Company, (company) => company.companyProducts, { onDelete: 'CASCADE' })
    company: Company;

    @ManyToOne(() => Product, (product) => product.companyProducts, { onDelete: 'CASCADE' })
    product: Product;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
