import axios from 'axios'
import queryString from 'query-string'

// public axiosClient
export const publicAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  params: (params: Record<string, any>) => queryString.stringify(params),
})

publicAxios.interceptors.request.use(
  config => {
    if (config.headers['source']) delete config.headers['source']
    config.headers['source'] = window.location.pathname

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

publicAxios.interceptors.response.use(
  response => {
    if (response.data) {
      return response.data
    }
    return response
  },
  error => {
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
