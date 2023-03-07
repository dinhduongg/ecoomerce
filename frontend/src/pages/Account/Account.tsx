import { FC } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Profile from './components/Profile'

const Account: FC = () => {
  const routes = [
    { to: 'thong-tin', name: 'Hồ sơ' },
    { to: 'dia-chi', name: 'Địa chỉ' },
    { to: 'doi-mat-khau', name: 'Đổi mật khẩu' }
  ]
  return (
    <div className='max-w-7xl mx-auto mt-4'>
      <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-2 p-2'>
          <div className='flex items-end space-x-3 border-b pb-2'>
            <img
              className='w-10 h-10'
              src='https://preview.colorlib.com/theme/fashe/images/icons/icon-header-01.png.webp'
              alt='ICON'
            />
            <span>username</span>
          </div>
          <ul>
            {routes.map((route, index) => {
              return (
                <NavLink to={route.to} className='block my-1'>
                  {route.name}
                </NavLink>
              )
            })}
          </ul>
        </div>
        <div className='col-span-10 bg-red-500'>
          <Routes>
            <Route path='thong-tin' element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Account
