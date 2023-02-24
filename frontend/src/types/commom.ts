export interface authContext {
    accessToken: string
    roles: string[]
    username: string
    fullname: string
}

export interface authForm {
    username?: string,
    password?: string,
    confirmPassword?: string
}