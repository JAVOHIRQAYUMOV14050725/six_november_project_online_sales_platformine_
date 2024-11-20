import { Module } from '@nestjs/common';
import { CompanyProductsService } from './company_products.service';
import { CompanyProductsController } from './company_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProduct } from './entities/company_product.entity';
import { Product } from 'src/products/entities/product.entity';
import { Company } from 'src/companies/entities/company.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyProduct, Product, Company]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '23h' },
    }),
    UsersModule,
  ],
  controllers: [CompanyProductsController],
  providers: [CompanyProductsService],
})
export class CompanyProductsModule {}
