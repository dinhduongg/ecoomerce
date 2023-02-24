import { FC } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

import useAuth from '~/hooks/useAuth'

interface Props {
  allowRoles: string[]
}

const RequireAuth: FC<Props> = ({ allowRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()

  return auth?.roles?.find((role: string) => allowRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/dang-nhap' state={{ from: location }} replace />
  )
}

export default RequireAuth
