export interface Voucher {
  code: string // primary key
  name: string
  description: string
  max_user_use: number
  user_use: number
  discount_amount?: number
  discount_percent?: number
  start_date: Date
  end_date: Date
}
