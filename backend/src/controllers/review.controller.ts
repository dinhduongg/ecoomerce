import { ReviewDTO } from '@/services/dto/review.dto'
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ReviewService } from '../services/review.service'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create') // id is product id
  create(@Body() dto: ReviewDTO) {
    return this.reviewService.create(dto)
  }

  @Get(':id') // get all comment of one product
  getProductReview(@Param('id') id: string) {
    return this.reviewService.getProductReview(id)
  }

  @Get()
  findAll() {
    return this.reviewService.findAll()
  }

  @Get('user/review') // get comment of an user in a product reviews
  getUserReview(@Body() dto: Pick<ReviewDTO, 'product_id' | 'user_id'>) {
    return this.reviewService.getUserReview(dto)
  }

  @Patch('update/:id') // id is product id
  update(@Param('id') id: string, @Body() dto: ReviewDTO) {
    return this.reviewService.update(id, dto)
  }

  @Delete('delete/:id') // id is product id
  remove(@Param('id') id: string, @Body() dto: Pick<ReviewDTO, 'product_id'>) {
    return this.reviewService.remove(id, dto)
  }
}
