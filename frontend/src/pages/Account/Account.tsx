import { FC, Fragment, useEffect } from 'react'
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { DefaultLayout } from '~/components/Layout'
import useAuth from '~/hooks/useAuth'
import { accountChildrenRoutes } from '~/routes/nestedRoutes'

const Account: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { auth } = useAuth()

  const routes = [
    { to: 'thong-tin', name: 'Hồ sơ' },
    { to: 'dia-chi', name: 'Địa chỉ' },
    { to: 'doi-mat-khau', name: 'Đổi mật khẩu' }
  ]

  useEffect(() => {
    if (!routes.find((item) => location.pathname.split('/')[2] === item.to)) {
      navigate('/tai-khoan/thong-tin')
      return
    }
  }, [])

  return (
    <div className='max-w-7xl mx-auto my-4'>
      <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-2 p-2 shadow-account-shadow'>
          <div className='flex items-end space-x-3 border-b pb-2'>
            <img
              className='w-10 h-10'
              src='https://preview.colorlib.com/theme/fashe/images/icons/icon-header-01.png.webp'
              alt='ICON'
            />
            <span>{auth?.username}</span>
          </div>
          <ul>
            {routes.map((route, index) => {
              return (
                <li className='block' key={index}>
                  <NavLink
                    to={route.to}
                    className={({ isActive }) =>
                      `inline-block my-1 duration-200 ${isActive ? 'text-button-hover' : 'hover:text-button-hover'}`
                    }
                  >
                    {route.name}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='col-span-10 shadow-account-shadow'>
          <Routes>
            {accountChildrenRoutes.map((route, index) => {
              const Page = route.component
              let Layout = DefaultLayout

              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page path={route.path} />
                    </Layout>
                  }
                />
              )
            })}
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Account
