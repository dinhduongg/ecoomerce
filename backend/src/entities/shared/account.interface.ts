import { AddressType, AuthorityRole, Gender } from './enum'

export interface Address {
  city_province?: string
  district?: string
  wards?: string
  detail_address?: string
  isMain: boolean
  addressType: AddressType
}

export interface Authentication {
  username: string
  password: string
  email?: string
  phone?: string
  gender?: Gender
  birthday?: Date
  fullname?: string
  authorities: AuthorityRole[]
  authority: AuthorityRole
  refreshToken?: string
}

export interface User extends Authentication {
  addresses: Address[]
  createdAt: Date
  updatedAt: Date
}
