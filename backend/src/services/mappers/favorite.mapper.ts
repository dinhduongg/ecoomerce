import { Injectable } from '@nestjs/common'
import { Builder } from 'builder-pattern'
import { ProductFavoriteDTO } from '../dto/favorite.dto'
import { ProductDTO } from '../dto/product.dto'

@Injectable()
export class ProductFavoriteMapper {
    toDTO(source: ProductFavoriteDTO): ProductFavoriteDTO {
        return Builder(ProductFavoriteDTO)
            .product_id(source.product_id)
            .product_name(source.product_name)
            .product_code(source.product_code)
            .product_image(source.product_image)
            .standard_price(source.standard_price)
            .discounted_price(source.discounted_price)
            .build()
    }

    toEntity(dto: Partial<ProductFavoriteDTO> & Pick<ProductDTO, 'id'>): ProductFavoriteDTO {
        return Builder(ProductFavoriteDTO)
            .product_id(dto.id ?? '')
            .product_name(dto.product_name ?? '')
            .product_code(dto.product_code ?? '')
            .product_image(dto.product_image ?? '')
            .standard_price(dto.standard_price ?? 0)
            .discounted_price(dto.discounted_price ?? 0)
            .build()
    }
}
