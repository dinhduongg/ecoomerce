import { Entity, Property, PrimaryKey } from '@mikro-orm/core'
import { Voucher as IVoucher } from './shared/voucher.interface'
import { Base } from './support/base.entity'

@Entity()
export class Voucher extends Base implements IVoucher {
  @PrimaryKey({ fieldName: '_id' }) code: string
  @Property() name: string
  @Property() description: string
  @Property() max_user_use: number
  @Property() user_use: number
  @Property() discount_amount?: number
  @Property() discount_percent?: number
  @Property() start_date: Date
  @Property() end_date: Date
}
