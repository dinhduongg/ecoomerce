import { useNavigate } from 'react-router-dom'
import { authState } from '~/context/AuthProvider'
import useAuth from './useAuth'
import usePrivateAxios from './usePrivateAxios'

const useLogout = () => {
  const { auth, setAuth } = useAuth()
  const privateAxios = usePrivateAxios()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await privateAxios.get('/auth/logout')
      setAuth(authState)
      navigate('/')
    } catch (error) {
      console.error('có lỗi: ', error)
    }
  }

  return logout
}

export default useLogout
