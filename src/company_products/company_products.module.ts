import { Module } from '@nestjs/common';
import { CompanyProductsService } from './company_products.service';
import { CompanyProductsController } from './company_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProduct } from './entities/company_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyProduct])],
  controllers: [CompanyProductsController],
  providers: [CompanyProductsService],
})
export class CompanyProductsModule {}
