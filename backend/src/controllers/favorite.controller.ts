import { TokenVerifyGuard } from '@/authentication/guards/token-verify.guard';
import { FavoriteDTO, ProductFavoriteDTO } from '@/services/dto/favorite.dto';
import { ProductDTO } from '@/services/dto/product.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { FavoriteService } from '../services/favorite.service';

@Controller('favorite')
@UseGuards(TokenVerifyGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) { }

  @Post('create')
  create(@Body() dto: Partial<ProductFavoriteDTO> & Pick<ProductDTO, 'id'>, @Req() req) {
    return this.favoriteService.create(dto, req.user);
  }

  @Get()
  getUserFavorite(@Req() req) {
    return this.favoriteService.getUserFavorite(req.user)
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.favoriteService.remove(id, req.user);
  }
}
