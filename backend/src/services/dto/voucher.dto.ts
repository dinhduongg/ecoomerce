import { Voucher as IVoucher } from '@/entities/shared/voucher.interface'

export class VoucherDTO implements IVoucher {
  code: string
  name: string
  description: string
  max_user_use: number
  user_use: number
  discount_amount?: number
  discount_percent?: number
  start_date: Date
  end_date: Date
}
