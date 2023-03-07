export interface ProductFavorite {
    product_id: string
    product_code: string
    product_name: string
    product_image: string
    standard_price: number
    discounted_price: number
}

export interface Favorite {
    username: string
    products: ProductFavorite[]
}