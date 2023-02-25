import { createContext, FC, useState } from 'react'
import { authContext } from '~/types/commom'

type Props = {
  children: React.ReactNode
}

interface IAuthContext {
  auth: authContext | undefined
  setAuth: React.Dispatch<React.SetStateAction<authContext | undefined>>
}

export const authState: authContext = {
  accessToken: '',
  authorities: [],
  username: '',
  authority: ''
}

const AuthContext = createContext<IAuthContext>({
  auth: authState,
  setAuth: () => {}
})

export const AuthProvider: FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<authContext>()

  return <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>{children}</AuthContext.Provider>
}

export default AuthContext
