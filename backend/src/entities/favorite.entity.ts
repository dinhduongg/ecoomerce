import { Entity, Property, PrimaryKey } from '@mikro-orm/core'
import { ProductFavorite, Favorite as IFavorite } from '@/entities/shared/favorite.interface'
import { Base } from '@/entities/support/base.entity'

@Entity()
export class Favorite extends Base implements IFavorite {
    @PrimaryKey({ fieldName: '_id' }) username: string
    @Property() products: ProductFavorite[]
}
