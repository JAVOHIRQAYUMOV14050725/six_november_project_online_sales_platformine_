import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { WishlistItem } from '../../wishlist_items/entities/wishlist_item.entity';

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.wishlists, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' }) 
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.wishlist)
    wishlistItems: WishlistItem[];
}
