import { Product } from '@/entities/product.entity'
import { EntityManager, MongoEntityRepository } from '@mikro-orm/mongodb'
import { InjectRepository } from '@mikro-orm/nestjs'
import { wrap } from '@mikro-orm/core'
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { ProductDTO } from './dto/product.dto'
import { ProductMapper } from './mappers/product.mapper'
import { Query } from '@/entities/shared/interface'
import { whereCond } from './support/dictionary'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    protected readonly repository: MongoEntityRepository<Product>,
    protected readonly em: EntityManager,
    protected readonly mapper: ProductMapper,
    @Inject(CACHE_MANAGER)
    protected readonly _cache: Cache
  ) {}

  async create(dto: ProductDTO) {
    try {
      const product = this.mapper.toEntity(dto)
      this.repository.create(product)
      await this.repository.flush()
      return 'tạo mới sản phẩm thành công'
    } catch (error) {
      throw error
    }
  }

  async findAll(source: string, query: Query): Promise<ProductDTO[]> {
    try {
      const { filters } = query

      const products = await this.repository.find(whereCond(filters))
      return products.map((product) => this.mapper.toDTO(product))
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string, source: string): Promise<ProductDTO> {
    try {
      const product = await this.repository.findOne({ id })
      return this.mapper.toDTO(product)
    } catch (error) {
      throw error
    }
  }

  async update(id: string, source: string, dto: ProductDTO): Promise<ProductDTO> {
    try {
      const product = await this.repository.findOne({ id })

      wrap(product).assign({ ...dto })
      await this.repository.persistAndFlush(product)

      return product
    } catch (error) {
      throw error
    }
  }

  async delete(id: string) {
    try {
      return await this.repository.nativeDelete({ id })
    } catch (error) {
      throw error
    }
  }
}
