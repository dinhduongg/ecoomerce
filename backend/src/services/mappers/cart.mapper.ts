import { Injectable } from '@nestjs/common'
import { Builder } from 'builder-pattern'
import { ProductCartDTO } from '../dto/cart.dto'
import { ProductDTO } from '../dto/product.dto'

@Injectable()
export class ProductCartMapper {
    toDTO(source: ProductCartDTO): ProductCartDTO {
        return Builder(ProductCartDTO)
            .product_id(source.product_id)
            .product_name(source.product_name)
            .product_code(source.product_code)
            .product_image(source.product_image)
            .standard_price(source.standard_price)
            .discounted_price(source.discounted_price)
            .total_price(source.total_price)
            .quantity(source.quantity)
            .build()
    }

    toEntity(dto: Partial<ProductCartDTO> & Pick<ProductDTO, 'id'>): ProductCartDTO {
        return Builder(ProductCartDTO)
            .product_id(dto.id ?? '')
            .product_name(dto.product_name ?? '')
            .product_code(dto.product_code ?? '')
            .product_image(dto.product_image ?? '')
            .standard_price(dto.standard_price ?? 0)
            .discounted_price(dto.discounted_price ?? 0)
            .total_price(dto.total_price ?? 0)
            .quantity(dto.quantity ?? 1)
            .build()
    }
}
