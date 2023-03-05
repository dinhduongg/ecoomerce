import classNames from 'classnames'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button'
import useAuth from '~/hooks/useAuth'
import useLogout from '~/hooks/useLogout'
import useCartCount from '~/hooks/useCartCount'
import { useMutation, useQuery } from '@tanstack/react-query'
import cartApi from '~/api/cart.api'
import { vietnameseCurrency } from '~/utils/utils'
import { ProductCart } from '~/shared/cart.interface'
import { toast } from 'react-toastify'
import { actions } from '~/reducer/cartCount'

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { auth } = useAuth()
  const { count, dispatch } = useCartCount()
  const logout = useLogout()

  const { data: userCart, refetch } = useQuery({
    queryKey: ['userCart'],
    queryFn: () => cartApi.getUserCart({}),
    cacheTime: 60 * 1000 * 10
  })

  const { mutateAsync: remove, isLoading: rLoading } = useMutation({
    mutationFn: (product: ProductCart) => {
      return cartApi.removeProduct(product.product_id, {})
    }
  })

  const routes = [
    { path: '/', name: 'Trang chủ' },
    { path: '/cua-hang', name: 'Shop' },
    { path: '/giam-gia', name: 'Đang giảm giá' },
    // { path: '/dac-trung', name: 'Đặc trưng' },
    { path: '/blog', name: 'Blog' },
    { path: '/gioi-thieu', name: 'Giới thiệu' },
    { path: '/lien-he', name: 'Liên hệ' }
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

  useEffect(() => {
    refetch()
  }, [count])

  const handleRevome = (product: ProductCart) => {
    remove(product, {
      onSuccess: () => {
        toast.success('Bỏ sản phẩm ra khỏi giỏ hàng thành công')
        dispatch(actions.removeFromCart(product.quantity))
      }
    })
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div
      className={classNames(
        'flex flex-wrap items-center justify-center bg-white transition-all duration-300 z-[9999] shadow-lg-header',
        {
          'fixed w-full top-0 h-16': Boolean(st > 50),
          'relative h-20': Boolean(st < 50)
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
            <li className='block py-5 px-4' onClick={handleLogout}>
              <NavLink
                to='/'
                className='text-[#333333] hover:border-b hover:border-b-[#333333] transition-all duration-300'
              >
                Đăng xuất
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      {/* user */}
      <div className='flex items-center absolute right-14 top-2/4 -translate-y-2/4'>
        {auth?.isAuthenticated ? (
          <>
            <NavLink to='/' className='block w-7 text-[#666666]'>
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
                {userCart?.products.length !== 0 ? (
                  <>
                    <ul className='max-h-72 overflow-auto cursor-default'>
                      {userCart?.products.map((cart, index) => {
                        return (
                          <li key={cart.product_id} className='flex flex-wrap items-center py-2'>
                            <div className='relative w-20 mr-5 group'>
                              <img src={cart.product_image} alt={cart.product_name} />
                              <div
                                onClick={() => handleRevome(cart)}
                                className='cursor-pointer absolute flex items-center justify-center h-full w-full top-0 bg-[rgba(0,0,0,0.5)] transition-all duration-300 opacity-0 group-hover:opacity-100'
                              >
                                <FontAwesomeIcon className='text-white text-lg' icon={faXmark} />
                              </div>
                            </div>
                            <div className='w-[calc(100%-100px)]'>
                              <NavLink
                                to={`/san-pham/${cart.product_id}`}
                                className='block text-55 leading-4 mb-3 break-words hover:text-button-hover'
                              >
                                {cart.product_name}
                              </NavLink>
                              <span className='block text-xs text-88 leading-4'>
                                <span>{cart.quantity}</span>
                                <span className='mx-1'>x</span>
                                <span>{vietnameseCurrency(cart.discounted_price)}</span>
                              </span>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                    <div className='leading-3 text-55 text-right pt-4 pb-7'>
                      Tổng: <span className='text-button-hover'>{vietnameseCurrency(userCart?.total_money ?? 0)}</span>
                    </div>
                    <div className='flex flex-wrap justify-between items-center'>
                      <Button to='/gio-hang' custom='w-[calc((100%-10px)/2)]' rounded primary>
                        Xem giỏ hàng
                      </Button>
                      <Button to='/thanh-toan' custom='w-[calc((100%-10px)/2)]' rounded primary>
                        Thanh toán
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className='text-center py-5 text-lg cursor-default'>Giỏ hàng của bạn trống trơn</div>
                )}
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
