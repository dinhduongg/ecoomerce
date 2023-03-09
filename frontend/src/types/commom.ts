import { Gender } from "~/shared/enum";

export interface authContext {
  accessToken?: string;
  authorities: string[]
  username: string
  authority: string
  isAuthenticated: boolean
}

export interface authForm {
  username?: string
  password?: string
  confirmPassword?: string;
}

export interface profileForm {
  fullname: string
  email: string
  phone: string
  gender: Gender
  birthday: Date
}

export interface LocationForm {
  fullname: string
  phone: string
  location: string
  external_location: string
}

export interface path {
  path: string
}
