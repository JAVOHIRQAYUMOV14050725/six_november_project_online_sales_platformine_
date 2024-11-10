import { Entity, PrimaryGeneratedColumn,  CreateDateColumn, UpdateDateColumn,  ManyToMany, JoinTable,  ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';  
import { CartItem } from '../../cart_items/entities/cart_item.entity';

@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.shoppingCarts)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

   
    @ManyToMany(() =>CartItem, (cartItem) => cartItem.shoppingCarts, { eager: true })
    @JoinTable()
    cartItems: CartItem[];
}
