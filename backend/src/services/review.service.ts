import { Product } from '@/entities/product.entity'
import { Review } from '@/entities/review.entity'
import { wrap } from '@mikro-orm/core'
import { EntityManager, MongoEntityRepository } from '@mikro-orm/mongodb'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/common/cache'
import { Inject } from '@nestjs/common/decorators'
import { HttpStatus } from '@nestjs/common/enums'
import { HttpException } from '@nestjs/common/exceptions'
import { Cache } from 'cache-manager'
import { ReviewDTO } from './dto/review.dto'
import { ReviewMapper } from './mappers/review.mapper'
import { generalReviewTemplate } from './support/dictionary'

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    protected readonly repository: MongoEntityRepository<Review>,
    protected readonly em: EntityManager,
    // protected eventEmitter: EventEmitter2,
    protected readonly mapper: ReviewMapper,
    @Inject(CACHE_MANAGER)
    protected readonly _cache: Cache
  ) { }

  async create(id: string, req: any, dto: ReviewDTO) {
    try {
      const alreadyReviewed = await this.getUserReview({ product_id: id, user_id: req?.user?.username })
      if (alreadyReviewed) throw new HttpException('Bạn đã đánh giá sản phẩm này rồi!', HttpStatus.BAD_REQUEST)

      const review = this.repository.create(generalReviewTemplate)

      review.product_id = id
      review.user_id = req.user.username
      review.rating = dto.rating
      review.comment = dto.comment
      await this.repository.persistAndFlush(review)

      await this.calculateProductReview(id)
      return review
    } catch (error) {
      throw error
    }
  }

  async getProductReview(id: string) {
    try {
      const reviews = await this.repository.find({ product_id: id })
      return reviews.map((review) => this.mapper.toDTO(review))
    } catch (error) {
      throw error
    }
  }

  async getUserReview(dto: Pick<ReviewDTO, 'product_id' | 'user_id'>) {
    try {
      const review = await this.repository.findOne({ product_id: dto.product_id, user_id: dto.user_id })
      return review
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all review`
  }

  async update(id: string, dto: ReviewDTO) {
    try {
      const review = await this.repository.findOne({ product_id: id })
      if (!review) throw new HttpException('Bạn chưa đánh giá sản phẩm này!', HttpStatus.BAD_REQUEST)

      review.comment = dto.comment
      review.rating = dto.rating

      await this.repository.persistAndFlush(review)
      await this.calculateProductReview(review.product_id)

      return { message: 'Cập nhật thành công', review }
    } catch (error) {
      throw error
    }
  }

  async remove(id: string, dto: Pick<ReviewDTO, 'product_id'>) {
    try {
      await this.repository.nativeDelete({ id })
      await this.calculateProductReview(dto.product_id)
      return 'Xóa bình luận thành công'
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const review = await this.repository.findOne({ id })
      return review
    } catch (error) {
      throw error
    }
  }

  async calculateProductReview(id: string) {
    try {
      const product = await this.em.findOne(Product, { id: id })
      const reviews = await this.getProductReview(id)

      product.num_review = reviews.length
      product.avg_rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

      product.avg_rating =
        +product.avg_rating.toFixed(1).split('.')[1] === 5
          ? +product.avg_rating.toFixed(1)
          : +product.avg_rating.toFixed(1).split('.')[1] < 5
            ? Math.floor(product.avg_rating)
            : Math.ceil(product.avg_rating)

      await this.em.persistAndFlush(product)
    } catch (error) {
      throw error
    }
  }
}
