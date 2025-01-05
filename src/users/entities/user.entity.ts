
import { Manager } from '../../manager/entities/manager.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany, ManyToOne,  } from 'typeorm';
import { Admin } from '../../admins/entities/admin.entity';
import { Address } from '../../addresses/entities/address.entity';
import { Order } from '../../orders/entities/order.entity';
import { UserRole } from '../../user_roles/entities/user_role.entity';
import { ActivityLog } from '../../activity_logs/entities/activity_log.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Recommendation } from '../../recommendations/entities/recommendation.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { ShoppingCart } from 'src/shopping_cart/entities/shopping_cart.entity';
import { Seller } from 'src/sellers/entities/seller.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true, length: 100 })
    email: string;

    @Column()
    password: string;

    @Column({ unique:true })
    phone_number: string;

    @Column({ nullable: true })
    refreshToken?: string;

    @Column()
    role: string

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    iat: Date;

    @OneToOne(() => Manager, (manager) => manager.user)
    @JoinColumn({ name: 'manager_id' })  
    manager: Manager;

    @OneToOne(() => Admin, (admin) => admin.user)
    @JoinColumn({ name: 'admin_id' })  
    admin: Admin;

     @OneToOne(() => Seller, (seller) => seller.user)
    @JoinColumn({ name: 'seller_id' })  
    seller: Seller;

    @ManyToMany(() => Address, address => address.users, { onDelete: 'CASCADE' })
    @Exclude()
    @JoinTable() 
    addresses: Address[];

    @ManyToMany(() => Order, order => order.users, { onDelete: 'CASCADE' })
    @Exclude()
    @JoinTable() 
    orders: Order[];

    @OneToMany(() => UserRole, (userRole) => userRole.user)
    roles: UserRole[];

 
    @OneToMany(() => ActivityLog, (activityLogs) => activityLogs.user)
    activityLogs: ActivityLog[];


    @OneToMany(() => Notification, (notifications) => notifications.user)
    notifications: Notification[];

    @OneToMany(() => Recommendation, (recommendation) => recommendation.user)
    recommendations: Recommendation[];
    
    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];

    @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
    wishlists: Wishlist[];

    
    @OneToMany(() => Cart, (cart) => cart.user)
    carts: Cart[];


    @OneToMany(() => ShoppingCart, (shoppingCart) => shoppingCart.user)
    shoppingCarts: ShoppingCart[];
}


