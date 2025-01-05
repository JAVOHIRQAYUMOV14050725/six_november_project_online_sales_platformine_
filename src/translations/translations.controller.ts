import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';

@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) { }

  @Post()
  async create(@Body() createTranslationDto: CreateTranslationDto) {
    return this.translationsService.create(createTranslationDto);
  }

  @Get()
  async findAll() {
    return this.translationsService.findAll();
  }

  @Get('language/:language_code')
  async findByLanguage(@Param('language_code') language_code: string) {
    return this.translationsService.findByLanguage(language_code);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.translationsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTranslationDto: UpdateTranslationDto,
  ) {
    return this.translationsService.update(+id, updateTranslationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.translationsService.remove(+id);
  }
}
