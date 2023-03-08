import axios, { AxiosError } from 'axios'
import { useSearchParams } from 'react-router-dom'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export const isEmptyObj = (obj: object) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const useQueryString = () => {
  const [searchParams] = useSearchParams()
  const searchParamsObject = Object.fromEntries([...searchParams])
  return searchParamsObject
}

export const vietnameseCurrency = (number: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}

export const secureInfo = (info: string, type: 'email' | 'phone') => {
  let secure
  if (type === 'email') {
    const split = info.split('@')
    secure = `${split[0].slice(0, 2)}${split[0].replaceAll(split[0], '**********')}@${split[1]}`
  }

  if (type === 'phone') {
    secure = `${info.replaceAll(info, '**********')}${info.slice(8, 10)}`
  }

  return secure
}
