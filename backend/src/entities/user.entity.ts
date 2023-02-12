import { Entity, Property, PrimaryKey } from '@mikro-orm/core'
import { Address, User as IUser } from '@/entities/shared/account.interface'
import { AuthorityRole } from '@/entities/shared/enum'
import { Base } from '@/entities/support/base.entity'

@Entity({ collection: 'users' })
export class User extends Base implements IUser {
  // authentication
  @PrimaryKey({ fieldName: '_id' }) username: string
  @Property() password: string
  @Property() email: string
  @Property() phone: string
  @Property() fullname: string
  @Property() authorities: AuthorityRole[]
  @Property() authority: AuthorityRole
  @Property() refreshToken: string

  // address
  @Property() addresses: Address[]
}
