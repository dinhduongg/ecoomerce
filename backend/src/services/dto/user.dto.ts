import { Address, User as IUser } from '@/entities/shared/account.interface'
import { AddressType, AuthorityRole, Gender } from '@/entities/shared/enum'

export class AddressDTO implements Address {
  city_province?: string
  district?: string
  wards?: string
  detail_address?: string
  isMain: boolean
  addressType: AddressType
}

export class UserDTO implements IUser {
  username: string
  password: string
  email?: string
  phone?: string
  fullname?: string
  gender?: Gender
  birthday?: Date

  authorities: AuthorityRole[]
  authority: AuthorityRole
  refreshToken?: string

  addresses: Address[]

  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
}
