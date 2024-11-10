import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';

import { Product } from '../../products/entities/product.entity';  
import { ShoppingCart } from 'src/shopping_cart/entities/shopping_cart.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToMany(() => ShoppingCart, shoppingCart => shoppingCart.cartItems)
    shoppingCarts: ShoppingCart[];

    @ManyToOne(() => Product, (product) => product.cartItems)
    @JoinColumn({ name: 'product_id' })  
    product: Product;

    @ManyToOne(() => Cart, (cart) => cart.cartItems)
    @JoinColumn({ name: 'cart_id' })
    cart: Cart;

    @Column()
    quantity: number; 

    @CreateDateColumn()
    createdAt: Date; 

    @UpdateDateColumn()
    updatedAt: Date; 
}


