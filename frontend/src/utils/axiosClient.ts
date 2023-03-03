import axios from 'axios'
import queryString from 'query-string'
import authApi from '~/api/auth.api'
import { toast } from 'react-toastify'

// public axiosClient
export const publicAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  params: (params: Record<string, any>) => queryString.stringify(params)
})

publicAxios.interceptors.request.use(
  (config) => {
    if (config.headers['source']) delete config.headers['source']
    config.headers['source'] = window.location.pathname

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

publicAxios.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// private axiosClient
export const privateAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params)
  }
})

privateAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')

    delete config.headers['source']
    delete config.headers['Authorization']

    config.headers['source'] = window.location.pathname
    if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

privateAxios.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data
    }
  },
  async (error) => {
    const prevRequest = error?.config
    if (error?.response?.status === 403 && !prevRequest.sent) {
      const accessToken: any = await authApi.refreshAccessToken()
      localStorage.clear()
      localStorage.setItem('accessToken', accessToken?.accessToken)
      prevRequest.sent = true
      prevRequest.headers['Authorization'] = `Bearer ${accessToken?.accessToken}`
      return privateAxios(prevRequest)
    }
    toast.error(error.response.data.message)
    return Promise.reject(error)
  }
)
