import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderStatus { 
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    status: string;

    @ManyToMany(() => Order, order => order.orderStatus)
    @JoinTable()  
    orders: Order[];
}
