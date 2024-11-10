import { OrderTracking } from "../../order_tracking/entities/order_tracking.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TrackingStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string 
    

    @OneToMany(() => OrderTracking, orderTracking => orderTracking.status)
    orderTrackings: OrderTracking[];
 }




