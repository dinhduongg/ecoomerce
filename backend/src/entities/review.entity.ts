import { Entity, Property } from '@mikro-orm/core'
import { Review as IReview } from './shared/review.interface'
import { SnowflakeBase } from './support/base.entity'

@Entity()
export class Review extends SnowflakeBase implements IReview {
  @Property() product_id: string
  @Property() user_id: string
  @Property() rating: number
  @Property() comment: string
}
