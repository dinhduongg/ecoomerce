import { Category } from '@/entities/category.entity';
import { Category as ICatecory } from '@/entities/shared/category.interface';
import { EntityManager, MongoEntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { cloneDeep } from 'lodash';
import { generalCategoryTemplate } from './support/dictionary';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    protected readonly repository: MongoEntityRepository<Category>,
    protected readonly em: EntityManager,
  ) { }

  async create(dto: ICatecory) {
    try {
      const category = this.repository.create(cloneDeep(generalCategoryTemplate))
      category.name = dto.name

      await this.repository.persistAndFlush(category)
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const categories = await this.repository.find({})
      return categories
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.repository.findOne({ id })
      return category
    } catch (error) {
      throw error
    }
  }

  async update(id: string, dto: ICatecory) {
    try {
      const category = await this.repository.findOne({ id })
      category.name = dto.name

      await this.repository.persistAndFlush(category)
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      await this.repository.nativeDelete({ id })
    } catch (error) {
      throw error
    }
  }
}
