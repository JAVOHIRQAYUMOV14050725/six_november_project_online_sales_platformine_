import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Wishlist } from '../../wishlists/entities/wishlist.entity'; 
import { Product } from '../../products/entities/product.entity';  

@Entity()
export class WishlistItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Wishlist, (wishlist) => wishlist.wishlistItems)
    @JoinColumn({ name: 'wishlist_id' })
    wishlist: Wishlist;

    @ManyToOne(() => Product, (product) => product.wishlistItems)
    @JoinColumn({ name: 'product_id' })  
    product: Product;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
