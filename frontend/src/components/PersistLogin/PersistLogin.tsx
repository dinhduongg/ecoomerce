import { FC, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import useAuth from '~/hooks/useAuth'
import useCartCount from '~/hooks/useCartCount'
import { actions } from '~/reducer/cartCount'

const PersistLogin: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { auth, setAuth } = useAuth()
  const { dispatch } = useCartCount()
  const [cookies] = useCookies(['userAuth'])

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        dispatch(actions.setCartCount(Number(localStorage.getItem('cartCount')) ?? 0))
        setAuth((prev: any) => ({
          ...prev,
          isAuthenticated: cookies.userAuth?.isAuthenticated,
          username: cookies.userAuth?.username,
          authorities: cookies.userAuth?.authorities,
          authority: cookies.userAuth?.authority
        }))
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    !auth?.isAuthenticated ? verifyRefreshToken() : setIsLoading(false)
  }, [])

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`)
  //   console.log(`at: ${JSON.stringify(auth?.accessToken)}`)
  // }, [isLoading])
  return <>{isLoading ? <p>Loading</p> : <Outlet />}</>
}

export default PersistLogin
