import { CompanyProduct } from '../../company_products/entities/company_product.entity';
import { Manager } from '../../manager/entities/manager.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique:true })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ length: 255 })
    address: string;

    @Column({ length: 15 })
    phone_number: string;

    @Column({ unique: true, length: 100 })
    email: string;

    @Column({ length: 100, nullable: true })
    website: string;

    @ManyToMany(() => Manager, (manager) => manager.companies)
    @JoinTable() 
    managers: Manager[];

    @OneToMany(() => CompanyProduct, (companyProduct) => companyProduct.company)
    companyProducts: CompanyProduct[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
