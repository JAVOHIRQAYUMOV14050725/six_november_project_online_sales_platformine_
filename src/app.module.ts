import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import redisStore from 'cache-manager-redis-store';
import { APP_FILTER } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { OrderStatusesModule } from './order_statuses/order_statuses.module';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
import { CouponsModule } from './coupons/coupons.module';
import { AddressesModule } from './addresses/addresses.module';
import { CartModule } from './cart/cart.module';
import { CategoriesModule } from './categories/categories.module';
import { InventoryModule } from './inventory/inventory.module';
import { InventoryLocationsModule } from './inventory_locations/inventory_locations.module';
import { PaymentStatusesModule } from './payment_statuses/payment_statuses.module';
import { ProductImagesModule } from './product_images/product_images.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SellersModule } from './sellers/sellers.module';
import { ShoppingCartModule } from './shopping_cart/shopping_cart.module';
import { WishlistItemsModule } from './wishlist_items/wishlist_items.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { HttpExceptionFilter } from './exception_filter';
import { ManagerModule } from './manager/manager.module';
import { CartItemsModule } from './cart_items/cart_items.module';
import { OrderTrackingModule } from './order_tracking/order_tracking.module';
import { TrackingStatusesModule } from './tracking_statuses/tracking_statuses.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user_roles/user_roles.module';
import { ActivityLogsModule } from './activity_logs/activity_logs.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { TranslationsModule } from './translations/translations.module';
import { CompaniesModule } from './companies/companies.module';
import { CompanyProductsModule } from './company_products/company_products.module';
import { Admin } from './admins/entities/admin.entity';
import { AdminsModule } from './admins/admins.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: +configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USER') || 'postgres',
        secret: configService.get<string>('JWT_SECRET') || 'oddiy_bola',
        password: configService.get<string>('DB_PASSWORD') || '4545',
        database: configService.get<string>('DB_NAME') || 'online_course',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,

      }),
      inject: [ConfigService],
    }),

    ConfigModule.forRoot({
      isGlobal: true,

    }),

    UsersModule,
    ProductsModule,
    OrderItemsModule,
    OrderStatusesModule,
    PaymentsModule,
    OrdersModule,
    AuthModule,
    CouponsModule,
    AddressesModule,
    CartModule,
    CategoriesModule,
    InventoryModule,
    AdminsModule,
    InventoryLocationsModule,
    PaymentStatusesModule,
    ProductImagesModule,
    ReviewsModule,
    SellersModule,
    ShoppingCartModule,
    WishlistItemsModule,
    WishlistsModule,
    ManagerModule,
    CartItemsModule,
    OrderTrackingModule,
    TrackingStatusesModule,
    RolesModule,
    UserRolesModule,
    ActivityLogsModule,
    NotificationsModule,
    RecommendationsModule,
    TranslationsModule,
    CompaniesModule,
    CompanyProductsModule,
    
  ],
  controllers: [AppController],
  providers: [
    AuthGuard,
    JwtService,
    AppService,
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [AuthGuard],
})
export class AppModule { }