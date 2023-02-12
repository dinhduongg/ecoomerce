import { Module } from '@nestjs/common'
import { ReviewService } from '../services/review.service'
import { ReviewController } from '../controllers/review.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Review } from '@/entities/review.entity'
import { ReviewMapper } from '@/services/mappers/review.mapper'

@Module({
  imports: [MikroOrmModule.forFeature([Review])],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewMapper],
  exports: [ReviewService]
})
export class ReviewModule {}
