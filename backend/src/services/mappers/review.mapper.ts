import { Review } from '@/entities/review.entity'
import { Injectable } from '@nestjs/common'
import { Builder } from 'builder-pattern'
import { ReviewDTO } from '../dto/review.dto'

@Injectable()
export class ReviewMapper {
  toDTO(source: Review): ReviewDTO {
    return Builder(ReviewDTO)
      .id(source.id)
      .product_id(source.product_id)
      .user_id(source.user_id)
      .rating(source.rating)
      .comment(source.comment)
      .build()
  }

  toEntity(dto: Partial<ReviewDTO>): Review {
    return Builder(Review)
      .product_id(dto.product_id ?? '')
      .user_id(dto.user_id ?? '')
      .rating(dto.rating ?? 0)
      .comment(dto.comment ?? '')
      .build()
  }
}
