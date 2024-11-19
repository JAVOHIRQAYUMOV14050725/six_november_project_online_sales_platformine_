import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { OrderItem } from '../../order_items/entities/order_item.entity';
import { CompanyProduct } from '../../company_products/entities/company_product.entity';
import { Recommendation } from '../../recommendations/entities/recommendation.entity';
import { WishlistItem } from '../../wishlist_items/entities/wishlist_item.entity';
import { ProductImage } from '../../product_images/entities/product_image.entity';
import { Category } from '../../categories/entities/category.entity';
import { Review } from '../../reviews/entities/review.entity';
import { CartItem } from '../../cart_items/entities/cart_item.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  name: string;

  @Column('text')
    description: string;

    @Column("decimal")
    price: number;

    @Column()
    category_id: number;

    @Column()
  stock_quantity: number;
  
  @OneToMany(() => CompanyProduct, (companyProduct) => companyProduct.product)
  companyProducts: CompanyProduct[];

  @OneToMany(() => OrderItem, orderItems => orderItems.product)
  orderItems: OrderItem[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation.product)
  recommendations: Recommendation[];

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.product)
  wishlistItems: WishlistItem[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' }) 
  category: Category;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => Inventory, (inventory) => inventory.product) 
  inventoryItems: Inventory[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
