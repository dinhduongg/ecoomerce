import { Address, User as IUser } from '@/entities/shared/account.interface'
import { AuthorityRole } from '@/entities/shared/enum'

export class UserDTO implements IUser {
  username: string
  password: string
  email?: string
  phone?: string
  fullname?: string
  authorities: AuthorityRole[]
  authority: AuthorityRole
  refreshToken?: string

  addresses: Address[]

  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
}
