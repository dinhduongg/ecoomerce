import { Voucher } from '@/entities/voucher.entity'
import { EntityManager, MongoEntityRepository } from '@mikro-orm/mongodb'
import { InjectRepository } from '@mikro-orm/nestjs'
import { CACHE_MANAGER, Injectable } from '@nestjs/common'
import { Inject } from '@nestjs/common/decorators/core/inject.decorator'
import { Cache } from 'cache-manager'
import { VoucherDTO } from './dto/voucher.dto'
import { VoucherMapper } from './mappers/voucher.mapper'

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
    protected readonly repository: MongoEntityRepository<Voucher>,
    protected readonly em: EntityManager,
    // protected eventEmitter: EventEmitter2,
    protected readonly mapper: VoucherMapper,
    @Inject(CACHE_MANAGER)
    protected readonly _cache: Cache
  ) {}

  async create(dto: VoucherDTO) {
    try {
      const voucher = this.mapper.toEntity(dto)
      await this.repository.persistAndFlush(voucher)
      return 'Tạo voucher thành công'
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const vouchers = await this.repository.find({})
      return vouchers
    } catch (error) {
      throw error
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} voucher`
  }

  async update(id: string, dto: VoucherDTO) {
    try {
      const voucher = await this.repository.findOne({ code: id })
      return `This action updates a #${id} voucher`
    } catch (error) {
      throw error
    }
  }

  remove(id: string) {
    return `This action removes a #${id} voucher`
  }
}
