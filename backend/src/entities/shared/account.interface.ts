import { AuthorityRole } from "./enum";

export interface Address {
    city?: string
    street?: string
    postalCode?: string
    country?: string
    description?: string
    isMain: boolean
}

export interface Authentication {
    username: string
    password: string
    email?: string
    phone?: string
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