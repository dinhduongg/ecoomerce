import { Product as IProduct } from '@/entities/shared/product.interface'
import { SnowflakeBase } from '@/entities/support/base.entity'
import { Entity, Property } from '@mikro-orm/core'

@Entity()
export class Product extends SnowflakeBase implements IProduct {
  @Property() product_code: string
  @Property() product_name: string
  @Property() product_image: string
  @Property() product_galley: string[]
  @Property() short_description: string
  @Property() description: string
  @Property() in_warehouse: number
  @Property() standard_price: number
  @Property() discounted_price: number
  @Property() size: string[]
  @Property() discount_percent: number
  @Property() discount_price: number
  @Property() category: string[]
  @Property() is_featured: boolean
  @Property() is_new: boolean
  @Property() num_review: number
  @Property() avg_rating: number
}
