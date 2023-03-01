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

export interface path {
  path: string
}
