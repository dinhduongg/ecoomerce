import { Voucher } from '@/entities/voucher.entity'
import { Injectable } from '@nestjs/common'
import { Builder } from 'builder-pattern'
import { VoucherDTO } from '../dto/voucher.dto'

@Injectable()
export class VoucherMapper {
  toDTO(source: Voucher): VoucherDTO {
    return Builder(VoucherDTO)
      .code(source.code)
      .name(source.name)
      .description(source.description)
      .max_user_use(source.max_user_use)
      .user_use(source.user_use)
      .discount_amount(source.discount_amount)
      .discount_percent(source.discount_percent)
      .start_date(source.start_date)
      .end_date(source.end_date)
      .build()
  }

  toEntity(dto: Partial<VoucherDTO>): Voucher {
    return Builder(Voucher)
      .code(dto.code)
      .name(dto.name)
      .description(dto.description)
      .max_user_use(dto.max_user_use)
      .user_use(dto.user_use)
      .discount_amount(dto.discount_amount)
      .discount_percent(dto.discount_percent)
      .start_date(dto.start_date)
      .end_date(dto.end_date)
      .build()
  }
}
