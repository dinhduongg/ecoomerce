import { TokenVerifyGuard } from '@/authentication/guards/token-verify.guard'
import { ReviewDTO } from '@/services/dto/review.dto'
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { ReviewService } from '../services/review.service'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post('create/:id') // id is product id
  @UseGuards(TokenVerifyGuard)
  create(@Param('id') id: string, @Req() req: any, @Body() dto: ReviewDTO) {
    return this.reviewService.create(id, req, dto)
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
  @UseGuards(TokenVerifyGuard)
  update(@Param('id') id: string, @Body() dto: ReviewDTO) {
    return this.reviewService.update(id, dto)
  }

  @Delete('delete/:id') // id is product id
  @UseGuards(TokenVerifyGuard)
  remove(@Param('id') id: string, @Body() dto: Pick<ReviewDTO, 'product_id'>) {
    return this.reviewService.remove(id, dto)
  }
}
