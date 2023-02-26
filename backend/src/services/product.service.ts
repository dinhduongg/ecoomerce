import { Product } from '@/entities/product.entity'
import { EntityManager, MongoEntityRepository } from '@mikro-orm/mongodb'
import { InjectRepository } from '@mikro-orm/nestjs'
import { wrap } from '@mikro-orm/core'
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { ProductDTO } from './dto/product.dto'
import { ProductMapper } from './mappers/product.mapper'
import { Query } from '@/entities/shared/interface'
import { makeFindOptions, whereCond } from '@/support/ultils'

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
      const { filters, pageable } = query
      const where = {}

      if (source.startsWith('/cua-hang')) {
        if (filters.from && filters.to) where['standard_price'] = { $gte: +filters.from, $lte: +filters.to }
        if (filters.category && filters.category !== 'all') {
          where['category'] = filters.category
        }

        const products = await this.repository.find(where, makeFindOptions(pageable))
        return products.map((product) => this.mapper.toDTO(product))
      }

      if (source.startsWith('/san-pham')) {
        where['category'] = { $in: [...filters.category] }
        const products = await this.repository.find(where)
        console.log(products)
        return products.map((product) => this.mapper.toDTO(product))
      }

      if (filters.is_featured) where['is_featured'] = filters.is_featured === 'true' ? true : false
      if (filters.is_new) where['is_new'] = filters.is_new === 'true' ? true : false

      const products = await this.repository.find(where)
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
