import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { Translation } from './entities/translation.entity';

@Injectable()
export class TranslationsService {
  constructor(
    @InjectRepository(Translation)
    private readonly translationRepository: Repository<Translation>,
  ) { }

  async create(createTranslationDto: CreateTranslationDto): Promise<Translation> {
    const { language_code, key } = createTranslationDto;

    // Kalitning takrorlanmasligini tekshirish
    const existingTranslation = await this.translationRepository.findOne({
      where: { language_code, key },
    });
    if (existingTranslation) {
      throw new BadRequestException(
        `Translation with key '${key}' already exists for language '${language_code}'`,
      );
    }

    const translation = this.translationRepository.create(createTranslationDto);
    return this.translationRepository.save(translation);
  }

  async findAll(): Promise<Translation[]> {
    return this.translationRepository.find();
  }

  async findOne(id: number): Promise<Translation> {
    const translation = await this.translationRepository.findOne({ where: { id } });
    if (!translation) {
      throw new NotFoundException(`Translation with ID ${id} not found`);
    }
    return translation;
  }

  async update(
    id: number,
    updateTranslationDto: UpdateTranslationDto,
  ): Promise<Translation> {
    const translation = await this.findOne(id);

    Object.assign(translation, updateTranslationDto);

    return this.translationRepository.save(translation);
  }

  async remove(id: number): Promise<void> {
    const translation = await this.findOne(id);
    await this.translationRepository.remove(translation);
  }

  async findByLanguage(language_code: string): Promise<Translation[]> {
    return this.translationRepository.find({ where: { language_code } });
  }
}
