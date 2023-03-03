import { ProductCart, Cart as ICart } from '@/entities/shared/cart.interface'

export class ProductCartDTO implements ProductCart {
    product_id: string
    product_code: string
    product_name: string
    product_image: string
    standard_price: number
    discounted_price: number
    total_price: number
    quantity: number
}

export class CartDTO implements ICart {
    username: string
    total_money: number
    products: ProductCartDTO[]
}
