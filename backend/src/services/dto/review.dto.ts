import { Review as IReview } from '@/entities/shared/review.interface'

export class ReviewDTO implements IReview {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string
}
