import { useNavigate } from 'react-router-dom'
import authApi from '~/api/auth.api'
import { authState } from '~/context/AuthProvider'
import useAuth from './useAuth'

const useLogout = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await authApi.sigtOut()
      localStorage.clear()
      setAuth(authState)
      navigate('/')
    } catch (error) {
      console.error('có lỗi: ', error)
    }
  }

  return logout
}

export default useLogout
