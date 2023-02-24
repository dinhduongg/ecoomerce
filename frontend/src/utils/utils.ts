import axios, { AxiosError } from 'axios'
import { useSearchParams } from 'react-router-dom'
import { authForm as aForm } from '~/types/commom'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error)
}

export const authForm = (data: aForm, type: string) => {
    const error = {} as aForm

    if (!data.username) {
        error['username'] = 'Tên đăng nhập không được để trống'
    }

    if (!data.password) {
        error['password'] = 'Mật khẩu không được để trống'
    }

    if (type === 'register' && !data.confirmPassword) {
        error['confirmPassword'] = 'Xin mời xác nhận lại mật khẩu'
    }

    return error
}

export const isEmptyObj = (obj: object) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const useQueryString = () => {
    const [searchParams] = useSearchParams()
    const searchParamsObject = Object.fromEntries([...searchParams])
    return searchParamsObject
}

export const vietnameseCurrency = (number: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}