import { Product } from '@/entities/product.entity'
import { Injectable } from '@nestjs/common'
import { Builder } from 'builder-pattern'
import { ProductDTO } from '../dto/product.dto'

@Injectable()
export class ProductMapper {
  toDTO(source: Product): ProductDTO {
    return Builder(ProductDTO)
      .id(source.id)
      .product_code(source.product_code)
      .product_name(source.product_name)
      .product_image(source.product_image)
      .product_galley(source.product_galley)
      .short_description(source.short_description)
      .description(source.description)
      .in_warehouse(source.in_warehouse)
      .standard_price(source.standard_price)
      .discounted_price(source.discounted_price)
      .size(source.size)
      .discount_percent(source.discount_percent)
      .discount_price(source.discount_price)
      .category(source.category)
      .inUserCart(source.inUserCart)
      .inUserFavorite(source.inUserFavorite)
      .is_featured(source.is_featured)
      .is_new(source.is_new)
      .num_review(source.num_review)
      .avg_rating(source.avg_rating)
      .build()
  }

  toEntity(dto: Partial<ProductDTO>): Product {
    return (
      Builder(Product)
        // .id(dto.id)
        .product_code(dto.product_code ?? '')
        .product_name(dto.product_name ?? '')
        .product_image(dto.product_image ?? '')
        .product_galley(dto.product_galley ?? [])
        .short_description(dto.short_description ?? '')
        .description(dto.description ?? '')
        .in_warehouse(dto.in_warehouse ?? 0)
        .standard_price(dto.standard_price ?? 0)
        .discounted_price(dto.discounted_price ?? 0)
        .size(dto.size ?? [])
        .discount_percent(dto.discount_percent ?? 0)
        .discount_price(dto.discount_price ?? 0)
        .category(dto.category ?? [])
        .inUserCart(dto.inUserCart ?? [])
        .inUserFavorite(dto.inUserFavorite ?? [])
        .is_featured(dto.is_featured ?? false)
        .is_new(dto.is_new ?? false)
        .num_review(dto.num_review ?? 0)
        .avg_rating(dto.avg_rating ?? 0)
        .build()
    )
  }
}
