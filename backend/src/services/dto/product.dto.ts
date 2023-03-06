import { Product as IProduct } from '@/entities/shared/product.interface'

export class ProductDTO implements IProduct {
  id: string
  product_code: string
  product_name: string
  product_image: string
  product_galley: string[]
  short_description: string
  description: string
  in_warehouse: number
  standard_price: number
  discounted_price: number
  size: string[]
  discount_percent: number
  discount_price: number
  category: string[]
  inUserCart: string[]
  is_featured: boolean
  is_new: boolean
  num_review: number
  avg_rating: number
}
