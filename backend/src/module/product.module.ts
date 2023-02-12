import { ProductController } from '@/controllers/product.controller'
import { Product } from '@/entities/product.entity'
import { ProductMapper } from '@/services/mappers/product.mapper'
import { ProductService } from '@/services/product.service'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

@Module({
  imports: [MikroOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductMapper],
  exports: [ProductService]
})
export class ProductModule {}
