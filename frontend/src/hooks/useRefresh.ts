import useAuth from '~/hooks/useAuth'
import { useCookies } from 'react-cookie'

const useRefresh = () => {
    const [cookies] = useCookies()
    const { setAuth } = useAuth()

    const refresh = async () => {
        setAuth((prev: any) => ({
            ...prev,
            accessToken: cookies.accessToken,
            username: cookies.username,
            fullname: cookies.fullname,
            roles: cookies.authorities
        }))

        return cookies
    }

    return refresh
}

export default useRefresh