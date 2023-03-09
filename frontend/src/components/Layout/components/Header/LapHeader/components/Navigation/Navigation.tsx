import classNames from 'classnames'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'
import useCartCount from '~/hooks/useCartCount'
import useLogout from '~/hooks/useLogout'
import CartNav from '../CartNav'

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { auth } = useAuth()
  const { count } = useCartCount()
  const logout = useLogout()

  const routes = [
    { path: '/', name: 'Trang chủ' },
    { path: '/cua-hang', name: 'Shop' },
    { path: '/giam-gia', name: 'Đang giảm giá' },
    // { path: '/dac-trung', name: 'Đặc trưng' },
    { path: '/blog', name: 'Blog' },
    { path: '/gioi-thieu', name: 'Giới thiệu' },
    { path: '/lien-he', name: 'Liên hệ' }
  ]

  const permissionRoutes = [
    { path: '/gio-hang', name: 'Giỏ hàng' },
    { path: '/yeu-thich', name: 'Yêu thích' }
  ]

  const authRoutes = [
    { name: 'Đăng nhập', path: '/dang-nhap' },
    { name: 'Đăng ký', path: '/dang-ky' }
  ]

  const toogleCart = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(!isOpen)
    }
  }

  const [st, setSt] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setSt(window.scrollY)
    })

    return () => {
      window.removeEventListener('scroll', () => {
        setSt(0)
      })
    }
  }, [])

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div
      className={classNames(
        'flex flex-wrap items-center justify-center bg-white transition-all duration-300 z-20 shadow-lg-header w-full',
        {
          'fixed top-0 py-0': Boolean(st >= 50),
          'relative py-2': Boolean(st < 50)
        }
      )}
    >
      {/* logo */}
      <NavLink to='/' className='block absolute left-14 top-2/4 -translate-y-2/4'>
        <img
          className='max-h-7'
          src='https://preview.colorlib.com/theme/fashe/images/icons/logo.png.webp'
          alt='IMG-LOGO'
        />
      </NavLink>

      {/* navigation */}
      <nav className='block'>
        <ul className='flex flex-wrap items-center justify-center'>
          {routes.map((route) => {
            return (
              <li key={route.path} className='block py-5 px-4'>
                <NavLink
                  className={classNames(
                    'text-[#333333] hover:border-b hover:border-b-[#333333] transition-all duration-300',
                    {
                      'text-[#e65540]': location.pathname === route.path
                    }
                  )}
                  to={route.path}
                >
                  {route.name}
                </NavLink>
              </li>
            )
          })}

          {auth?.isAuthenticated && (
            <>
              {permissionRoutes.map((route) => {
                return (
                  <li key={route.path} className='block py-5 px-4'>
                    <NavLink
                      className={classNames(
                        'text-[#333333] hover:border-b hover:border-b-[#333333] transition-all duration-300',
                        {
                          'text-[#e65540]': location.pathname === route.path
                        }
                      )}
                      to={route.path}
                    >
                      {route.name}
                    </NavLink>
                  </li>
                )
              })}
              <li className='block py-5 px-4' onClick={handleLogout}>
                <NavLink
                  to='/'
                  className='text-[#333333] hover:border-b hover:border-b-[#333333] transition-all duration-300'
                >
                  Đăng xuất
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* user */}
      <div className='flex items-center absolute right-14 top-2/4 -translate-y-2/4'>
        {auth?.isAuthenticated ? (
          <>
            <NavLink to='/tai-khoan' className='block w-7 text-[#666666]'>
              <img src='https://preview.colorlib.com/theme/fashe/images/icons/icon-header-01.png.webp' alt='ICON' />
            </NavLink>
            <span className='block h-5 w-[1px] bg-[#e5e5e5] mx-6 my-auto'></span>
            <div className='relative w-7 h-7 cursor-pointer'>
              <img
                src='https://preview.colorlib.com/theme/fashe/images/icons/icon-header-02.png'
                alt='ICON'
                onClick={(e: any) => toogleCart(e)}
              />
              <span
                className='flex items-center justify-center w-4 h-4 rounded-full bg-[#111111] text-white text-xs absolute top-0 -right-0.5'
                onClick={(e: any) => toogleCart(e)}
              >
                {count}
              </span>

              {/* cart */}
              <div
                className={classNames(
                  'absolute z-[1100] w-[340px] top-[190%] -right-[10px] p-4 border-t-[3px] order-t-[#e6e6e6] bg-white shadow-lg-cart transition-all duration-300 scale-0 origin-top-right',
                  {
                    'scale-100': isOpen
                  }
                )}
              >
                {isOpen && <CartNav />}
              </div>
            </div>
          </>
        ) : (
          authRoutes.map((authRoute) => {
            return (
              <li key={authRoute.path} className='block py-5 px-4'>
                <NavLink
                  className={classNames(
                    'text-[#333333] hover:border-b hover:border-b-[#333333] transition-all duration-300',
                    {
                      'text-[#e65540]': location.pathname === authRoute.path
                    }
                  )}
                  to={authRoute.path}
                >
                  {authRoute.name}
                </NavLink>
              </li>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Navigation
