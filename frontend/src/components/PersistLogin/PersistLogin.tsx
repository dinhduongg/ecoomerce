import { FC, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import useAuth from '~/hooks/useAuth'

const PersistLogin: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { auth, setAuth } = useAuth()
  const [cookie] = useCookies()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        // await refresh()
        setAuth((prev: any) => ({
          ...prev,
          accessToken: cookie.jwt?.accessToken,
          username: cookie.jwt?.username,
          fullname: cookie.jwt?.fullname,
          roles: cookie.jwt?.roles
        }))
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
  }, [])

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`)
  //   console.log(`at: ${JSON.stringify(auth?.accessToken)}`)
  // }, [isLoading])
  return <>{isLoading ? <p>Loading</p> : <Outlet />}</>
}

export default PersistLogin
