import { AxiosHeaders } from "axios"
import { useEffect } from "react"
import { useCookies } from 'react-cookie'
import { useLocation } from "react-router-dom"
import { publicAxios } from "~/utils/axiosClient"
import useAuth from "./useAuth"

const usePublicAxios = () => {
    const [cookie] = useCookies()
    const location = useLocation()
    const { auth } = useAuth()

    useEffect(() => {

        const requestIntercept = publicAxios.interceptors.request.use(
            config => {
                (config.headers as AxiosHeaders).set('source', location.pathname);
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