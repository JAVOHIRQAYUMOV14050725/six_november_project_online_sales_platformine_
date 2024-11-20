import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyProductDto } from './dto/create-company_product.dto';
import { UpdateCompanyProductDto } from './dto/update-company_product.dto';
import { Company } from '../companies/entities/company.entity';
import { Product } from '../products/entities/product.entity';
import { CompanyProduct } from './entities/company_product.entity';

@Injectable()
export class CompanyProductsService {
  constructor(
    @InjectRepository(CompanyProduct)
    private readonly companyProductRepository: Repository<CompanyProduct>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  // Create
  async create(createCompanyProductDto: CreateCompanyProductDto) {
    const { company_id, product_id } = createCompanyProductDto;

    const company = await this.companyRepository.findOne({ where: { id: company_id } });
    const product = await this.productRepository.findOne({ where: { id: product_id } });

    if (!company || !product) {
      const companies = await this.companyRepository.find({ select: ['id', 'name'] });
      const products = await this.productRepository.find({ select: ['id', 'name'] });

      throw new HttpException(
        {
          message: 'Invalid company or product ID.',
          companies,
          products,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const companyProduct = this.companyProductRepository.create({
      company,
      product,
    });

    return await this.companyProductRepository.save(companyProduct);
  }

  // Find all
  async findAll() {
    return await this.companyProductRepository.find({
      relations: ['company', 'product'],
    });
  }

  // Find one
  async findOne(id: number) {
    const companyProduct = await this.companyProductRepository.findOne({
      where: { id },
      relations: ['company', 'product'],
    });

    if (!companyProduct) {
      throw new HttpException('CompanyProduct not found', HttpStatus.NOT_FOUND);
    }

    return companyProduct;
  }

  // Update
  async update(id: number, updateCompanyProductDto: UpdateCompanyProductDto) {
    const companyProduct = await this.companyProductRepository.findOne({ where: { id } });

    if (!companyProduct) {
      throw new HttpException('CompanyProduct not found', HttpStatus.NOT_FOUND);
    }

    const { company_id, product_id } = updateCompanyProductDto;

    if (company_id) {
      const company = await this.companyRepository.findOne({ where: { id: company_id } });
      if (!company) {
        throw new HttpException('Invalid company ID', HttpStatus.BAD_REQUEST);
      }
      companyProduct.company = company;
    }

    if (product_id) {
      const product = await this.productRepository.findOne({ where: { id: product_id } });
      if (!product) {
        throw new HttpException('Invalid product ID', HttpStatus.BAD_REQUEST);
      }
      companyProduct.product = product;
    }

    return await this.companyProductRepository.save(companyProduct);
  }

  // Remove
  async remove(id: number) {
    const companyProduct = await this.companyProductRepository.findOne({ where: { id } });

    if (!companyProduct) {
      throw new HttpException('CompanyProduct not found', HttpStatus.NOT_FOUND);
    }

    await this.companyProductRepository.remove(companyProduct);
    return { message: 'CompanyProduct successfully removed' };
  }
}
