import { Entity, Property, PrimaryKey } from '@mikro-orm/core'
import { ProductCart, Cart as ICart } from '@/entities/shared/cart.interface'
import { Base } from '@/entities/support/base.entity'

@Entity()
export class Cart extends Base implements ICart {
    @PrimaryKey({ fieldName: '_id' }) username: string
    @Property() total_money: number
    @Property() products: ProductCart[]
}
