import { FC, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import useAuth from '~/hooks/useAuth'
import useCartCount from '~/hooks/useCartCount'
import { actions } from '~/reducer/cartCount'
import cartApi from '~/api/cart.api'

const PersistLogin: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { auth, setAuth } = useAuth()
  const { dispatch } = useCartCount()
  const [cookies] = useCookies(['userAuth'])

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        setAuth((prev: any) => ({
          ...prev,
          isAuthenticated: cookies.userAuth?.isAuthenticated,
          username: cookies.userAuth?.username,
          authorities: cookies.userAuth?.authorities,
          authority: cookies.userAuth?.authority
        }))

        const controller = new AbortController()
        if (Boolean(cookies.userAuth?.isAuthenticated) === false) {
          controller.abort()
        }
        const count = await cartApi.getUserCartCount({}, controller.signal)
        dispatch(actions.setCartCount(count.count))
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    !auth?.isAuthenticated ? verifyRefreshToken() : setIsLoading(false)
  }, [])

  return <>{isLoading ? <p>Loading</p> : <Outlet />}</>
}

export default PersistLogin
