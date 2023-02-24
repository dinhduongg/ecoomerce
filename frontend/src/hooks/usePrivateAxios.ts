import { AxiosHeaders } from "axios"
import { useEffect } from "react"
import { useCookies } from 'react-cookie'
import { useLocation } from "react-router-dom"
import { privateAxios } from "~/utils/axiosClient"
import useAuth from "./useAuth"

const usePrivateAxios = () => {
    const [cookie] = useCookies()
    const location = useLocation()
    const { auth } = useAuth()

    useEffect(() => {

        const requestIntercept = privateAxios.interceptors.request.use(
            config => {
                // config.headers = {
                //     ...config.headers,
                (config.headers as AxiosHeaders).set('Authorization', `Bearer ${auth?.accessToken}`);
                (config.headers as AxiosHeaders).set('source', location.pathname);
                //     Authorization: `Bearer ${auth?.accessToken}`
                // }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        const responseIntercept = privateAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true
                    prevRequest.headers['Authorization'] = `Bearer ${cookie.jwt.accessToken}`
                    return privateAxios(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            privateAxios.interceptors.request.eject(requestIntercept)
            privateAxios.interceptors.response.eject(responseIntercept)
        }

    }, [auth, cookie])

    return privateAxios
}

export default usePrivateAxios  