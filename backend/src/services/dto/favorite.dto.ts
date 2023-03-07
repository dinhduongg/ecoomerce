import { ProductFavorite, Favorite as IFavorite } from '@/entities/shared/favorite.interface'

export class ProductFavoriteDTO implements ProductFavorite {
    product_id: string
    product_code: string
    product_name: string
    product_image: string
    standard_price: number
    discounted_price: number
}

export class FavoriteDTO implements IFavorite {
    username: string
    products: ProductFavoriteDTO[]
}
