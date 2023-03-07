import { Module } from '@nestjs/common';
import { FavoriteService } from '../services/favorite.service';
import { FavoriteController } from '../controllers/favorite.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Favorite } from '@/entities/favorite.entity';
import { AuthModule } from './auth.module';
import { ProductFavoriteMapper } from '@/services/mappers/favorite.mapper';

@Module({
  imports: [MikroOrmModule.forFeature([Favorite]), AuthModule],
  controllers: [FavoriteController],
  providers: [FavoriteService, ProductFavoriteMapper],
  exports: [FavoriteService]
})
export class FavoriteModule { }
