export interface authContext {
  accessToken: string
  authorities: string[]
  username: string
  authority: string
}

export interface authForm {
  username?: string
  password?: string
  confirmPassword?: string
}
