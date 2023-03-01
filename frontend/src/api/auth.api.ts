import { User } from '~/shared/account.interface'
import { authForm } from '~/types/commom'
import { privateAxios } from '~/utils/axiosClient'

const authApi = {
  refreshAccessToken: () => {
    return privateAxios.get('/auth/refresh')
  },

  signIn: (body: Omit<authForm, 'confirmPassword'>) => {
    return privateAxios.post('/auth/login', body)
  },

  signUp: (body: authForm) => {
    return privateAxios.post('/auth/register', body)
  },

  sigtOut: () => {
    return privateAxios.get('/auth/logout')
  }
}

export default authApi
