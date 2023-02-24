import classNames from 'classnames'
import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button'
import { faFacebookF, faInstagram, faPinterestP, faSnapchat, faYoutube } from '@fortawesome/free-brands-svg-icons'

const MobileHeader: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)

  const routes = [
    { path: '/', name: 'Trang chủ' },
    { path: '/cua-hang', name: 'Shop' },
    { path: '/giam-gia', name: 'Đang giảm giá' },
    { path: '/dac-trung', name: 'Đặc trưng' },
    { path: '/blog', name: 'Blog' },
    { path: '/gioi-thieu', name: 'Giới thiệu' },
    { path: '/lien-he', name: 'Liên hệ' }
  ]

  const toogleCart = (e: any) => {
    if (e.target === e.currentTarget) {
      setIsOpen(!isOpen)
    }
  }

  const toogleMenu = (e: any) => {
    if (e.target === e.currentTarget) {
      setIsOpen2(!isOpen2)
    }
  }

  return (
    <div className='shadow-lg-header'>
      <div className='flex flex-wrap items-center justify-between min-h-[80px] pl-5 py-2 bg-white'>
        <NavLink to='/'>
          <img src='https://preview.colorlib.com/theme/fashe/images/icons/logo.png' alt='IMG_LOGO' />
        </NavLink>
        <div className='flex h-full justify-center items-center'>
          <div className='flex items-center mr-4'>
            <NavLink to='/' className='block w-7 relative'>
              <img
                src='https://preview.colorlib.com/theme/fashe/images/icons/icon-header-01.png'
                alt='ICON'
                className='h-full'
              />
            </NavLink>
            <span className='block h-5 w-[1px] mx-3 mt-1'></span>
            <div className='relative w-7 h-7 cursor-pointer'>
              <img
                src='https://preview.colorlib.com/theme/fashe/images/icons/icon-header-02.png'
                alt='ICON'
                onClick={(e: any) => toogleCart(e)}
              />
              <span
                className='flex items-center justify-center w-4 h-4 rounded-full bg-[#111111] text-white text-xs absolute top-0 -right-1'
                onClick={(e: any) => toogleCart(e)}
              >
                0
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
                <ul className='max-h-72 overflow-auto'>
                  <li className='flex flex-wrap items-center py-2'>
                    <div className='relative w-20 mr-5 group'>
                      <img src='https://preview.colorlib.com/theme/fashe/images/item-cart-01.jpg' alt='anh san pham' />
                      <div className='absolute flex items-center justify-center h-full w-full top-0 bg-[rgba(0,0,0,0.5)] transition-all duration-300 opacity-0 group-hover:opacity-100'>
                        <FontAwesomeIcon className='text-white text-lg' icon={faXmark} />
                      </div>
                    </div>
                    <div className='w-[calc(100%-100px)]'>
                      <NavLink to='/' className='block text-55 leading-4 mb-3 break-words'>
                        asas;dlaskd
                      </NavLink>
                      <span className='block text-xs text-88 leading-4'>1 x 10.000d</span>
                    </div>
                  </li>
                  <li className='flex flex-wrap items-center py-2'>
                    <div className='relative w-20 mr-5 group'>
                      <img src='https://preview.colorlib.com/theme/fashe/images/item-cart-01.jpg' alt='anh san pham' />
                      <div className='absolute flex items-center justify-center h-full w-full top-0 bg-[rgba(0,0,0,0.5)] transition-all duration-300 opacity-0 group-hover:opacity-100'>
                        <FontAwesomeIcon className='text-white text-lg' icon={faXmark} />
                      </div>
                    </div>
                    <div className='w-[calc(100%-100px)]'>
                      <NavLink to='/' className='block text-55 leading-4 mb-3 break-words'>
                        asas;dlaskd
                      </NavLink>
                      <span className='block text-xs text-88 leading-4'>1 x 10.000d</span>
                    </div>
                  </li>
                  <li className='flex flex-wrap items-center py-2'>
                    <div className='relative w-20 mr-5 group'>
                      <img src='https://preview.colorlib.com/theme/fashe/images/item-cart-01.jpg' alt='anh san pham' />
                      <div className='absolute flex items-center justify-center h-full w-full top-0 bg-[rgba(0,0,0,0.5)] transition-all duration-300 opacity-0 group-hover:opacity-100'>
                        <FontAwesomeIcon className='text-white text-lg' icon={faXmark} />
                      </div>
                    </div>
                    <div className='w-[calc(100%-100px)]'>
                      <NavLink to='/' className='block text-55 leading-4 mb-3 break-words'>
                        asas;dlaskd
                      </NavLink>
                      <span className='block text-xs text-88 leading-4'>1 x 10.000d</span>
                    </div>
                  </li>
                </ul>
                <div className='leading-3 text-55 text-right pt-4 pb-7'>Total: 210.000d</div>
                <div className='flex flex-wrap justify-between items-center'>
                  <Button custom='w-[calc((100%-10px)/2)] bg-[#222222] text-white rounded-[20px]'>Xem giỏ hàng</Button>
                  <Button to='/thanh-toan' custom='w-[calc((100%-10px)/2)] bg-[#222222] text-white rounded-[20px]'>
                    Thanh toán
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* menu bar */}
          <div className='relative flex items-center'>
            <div className='absolute top-0 right-0 bottom-0 left-0' onClick={(e: any) => toogleMenu(e)}></div>
            <FontAwesomeIcon className='text-2xl p-4' icon={faBars} />
          </div>
        </div>
      </div>
      <div
        className={classNames('z-[1000] top-[80px] w-full transition-all duration-300 overflow-hidden max-h-0', {
          'max-h-[500px]': isOpen2
        })}
      >
        <div className='py-2 pl-5 border-t border-t-[#ececec]'>
          <span className='text-88 text-sm'>Free shipping for standard order over $100</span>
        </div>
        <div className='py-2 pl-5 border-t border-t-[#ececec]'>
          <span className='text-88 text-sm'>shop@gmail.com</span>
        </div>
        <div className='flex items-center pl-5 py-2 border-t border-t-[#ececec] space-x-6'>
          <a href='#' className='text-lg text-88 hover:text-[#e65540] duration-300'>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href='#' className='text-lg text-88 hover:text-[#e65540] duration-300'>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href='#' className='text-lg text-88 hover:text-[#e65540] duration-300'>
            <FontAwesomeIcon icon={faPinterestP} />
          </a>
          <a href='#' className='text-lg text-88 hover:text-[#e65540] duration-300'>
            <FontAwesomeIcon icon={faSnapchat} />
          </a>
          <a href='#' className='text-lg text-88 hover:text-[#e65540] duration-300'>
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
        <ul className='py-2 px-5 border-t border-t-[#ececec]'>
          {routes.map((route) => {
            return (
              <li key={route.path} className='py-2 border-b border-b-[#ececec] last:border-b-0'>
                <NavLink to={route.path}>{route.name}</NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default MobileHeader
