export interface ProductCart {
    product_id: string
    product_code: string
    product_name: string
    product_image: string
    standard_price: number
    discounted_price: number
    total_price: number
    quantity: number
}

export interface Cart {
    username: string
    total_money: number
    products: ProductCart[]
}