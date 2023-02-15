import { Module } from '@nestjs/common'
import { VoucherService } from '../services/voucher.service'
import { VoucherController } from '../controllers/voucher.controller'
import { Voucher } from '@/entities/voucher.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { VoucherMapper } from '@/services/mappers/voucher.mapper'

@Module({
  imports: [MikroOrmModule.forFeature([Voucher])],
  controllers: [VoucherController],
  providers: [VoucherService, VoucherMapper],
  exports: [VoucherService]
})
export class VoucherModule {}
