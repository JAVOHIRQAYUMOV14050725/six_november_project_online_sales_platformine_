import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    const { name, phone_number, email, website } = createCompanyDto;

    const existingCompany = await this.companyRepository.findOne({
      where: [
        { name },
        { phone_number },
        { email },
        { website },
      ],
    });

    if (existingCompany) {
      let conflictField = '';
      if (existingCompany.name === name) conflictField = 'name';
      else if (existingCompany.phone_number === phone_number) conflictField = 'phone_number';
      else if (existingCompany.email === email) conflictField = 'email';
      else if (existingCompany.website === website) conflictField = 'website';

      throw new HttpException(
        `Company with ${conflictField} '${createCompanyDto[conflictField]}' already exists.`,
        HttpStatus.CONFLICT,
      );
    }

    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }



  async findAll() {
    return await this.companyRepository.find();
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new Error('Company not found');
    }
    return company;
  }

  async update(id: number, updateCompanyDto: Partial<CreateCompanyDto>) {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }

    const { name, phone_number, email, website} = updateCompanyDto;

    const existingCompany = await this.companyRepository.findOne({
      where: [
        { name, id: Not(id) },
        { phone_number, id: Not(id) },
        { email, id: Not(id) },
        { website, id: Not(id) },

      ],
    });

    if (existingCompany) {
      let conflictField = '';
      if (existingCompany.name === name) conflictField = 'name';
      else if (existingCompany.phone_number === phone_number) conflictField = 'phone_number';
      else if (existingCompany.email === email) conflictField = 'email';
      else if (existingCompany.website === website) conflictField = 'website';

      throw new HttpException(
        `Company with ${conflictField} '${updateCompanyDto[conflictField]}' already exists.`,
        HttpStatus.CONFLICT,
      );
    }

    Object.assign(company, updateCompanyDto);
    return await this.companyRepository.save(company);
  }


  async remove(id: number) {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new Error('Company not found');
    }

    await this.companyRepository.remove(company);
    return { message: `Company with id ${id} has been removed` };
  }
}
