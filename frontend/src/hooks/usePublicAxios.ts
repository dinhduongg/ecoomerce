import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { publicAxios } from '~/utils/axiosClient'

const usePublicAxios = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const requestIntercept = publicAxios.interceptors.request.use(
      (config) => {
        delete config.headers['source']
        config.headers['source'] = pathname
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // const responseIntercept = publicAxios.interceptors.response.use(
    //     response => response,
    //     async (error) => {
    //         const prevRequest = error?.config
    //         if (error?.response?.status === 403 && !prevRequest.sent) {
    //             prevRequest.sent = true
    //             prevRequest.headers['Authorization'] = `Bearer ${cookie.jwt.accessToken}`
    //             return publicAxios(prevRequest)
    //         }
    //         return Promise.reject(error)
    //     }
    // )

    return () => {
      publicAxios.interceptors.request.eject(requestIntercept)
      // publicAxios.interceptors.response.eject(responseIntercept)
    }
  }, [])

  return publicAxios
}

export default usePublicAxios
