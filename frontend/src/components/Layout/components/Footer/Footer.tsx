import { faFacebookF, faInstagram, faPinterestP, faSnapchat, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '~/components/Button'

const Footer: FC = () => {
  return (
    <footer className='bg-[#f0f0f0] py-11 lg:p-11'>
      <div className='grid grid-col-1 lg:grid-cols-[26%_16%_16%_16%_26%] pb-16'>
        <div className='px-4 pt-8'>
          <h4 className='pb-8 text-[#222222] uppercase font-bold'>Get in touch</h4>
          <div>
            <p className='text-55 text-sm'>
              Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96
              716 6879
            </p>
            <div className='pt-8 space-x-6'>
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
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:col-span-3 lg:grid-cols-3'>
          <div className='px-4 pt-8'>
            <h4 className='pb-8 text-[#222222] uppercase font-bold'>Categories</h4>
            <ul>
              <li className='pb-2 text-55'>
                <NavLink to='/' className='hover:text-[#e65540] duration-300'>
                  Nam
                </NavLink>
              </li>
              <li className='pb-2 text-55'>
                <NavLink to='/' className='hover:text-[#e65540] duration-300'>
                  Nữ
                </NavLink>
              </li>
              <li className='pb-2 text-55'>
                <NavLink to='/' className='hover:text-[#e65540] duration-300'>
                  Thời trang
                </NavLink>
              </li>
              <li className='pb-2 text-55'>
                <NavLink to='/' className='hover:text-[#e65540] duration-300'>
                  Mắt kính
                </NavLink>
              </li>
            </ul>
          </div>
          <div className='px-4 pt-8'>
            <h4 className='pb-8 text-[#222222] uppercase font-bold'>Liên kết</h4>
            <ul>
              <li className='pb-2 text-55'>
                <NavLink to='/' className='hover:text-[#e65540] duration-300'>
                  Tìm kiếm
                </NavLink>
              </li>
              <li className='pb-2 text-55'>
                <NavLink to='/' className='hover:text-[#e65540] duration-300'>
                  Liên hệ
                </NavLink>
              </li>
              <li className='pb-2 text-55'>
                <NavLink to='/' className='hover:text-[#e65540] duration-300'>
                  Giới thiệu
                </NavLink>
              </li>
              <li className='pb-2 text-55'>
                <NavLink to='/' className='hover:text-[#e65540] duration-300'>
                  Returns
                </NavLink>
              </li>
            </ul>
          </div>
          <div className='px-4 pt-8'>
            <h4 className='pb-8 text-[#222222] uppercase font-bold'>Trợ giúp</h4>
            <ul>
              <li className='pb-2 text-55'>
                <NavLink to='/' className='hover:text-[#e65540] duration-300'>
                  Track Order
                </NavLink>
              </li>
              <li className='pb-2 text-55'>
                <NavLink to='/' className='hover:text-[#e65540] duration-300'>
                  Returns
                </NavLink>
              </li>
              <li className='pb-2 text-55'>
                <NavLink to='/' className='hover:text-[#e65540] duration-300'>
                  Shipping
                </NavLink>
              </li>
              <li className='pb-2 text-55'>
                <NavLink to='/' className='hover:text-[#e65540] duration-300'>
                  FAQs
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className='px-4 pt-8'>
          <h4 className='pb-8 text-[#222222] uppercase font-bold'>Bản tin</h4>
          <form action=''>
            <div className='relative border-b border-b-[#cccccc] max-w-[250px]'>
              <input
                type='text'
                placeholder='email@gmail.com'
                className='bg-[#f0f0f0] outline-none placeholder:text-sm pb-1 peer'
              />
              <span className='block absolute -bottom-[1px] left-0 w-0 h-[1px] bg-[#e65540] peer-focus:w-full transition-all duration-300'></span>
            </div>
            <div className='pt-5 w-40'>
              <Button primary full rounded>
                Đăng ký
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className='px-4 text-center'>
        <div className='flex justify-center space-x-1'>
          <a href='#'>
            <img src='https://preview.colorlib.com/theme/fashe/images/icons/paypal.png' alt='IMG-PAYPAL' />
          </a>
          <a href='#'>
            <img src='https://preview.colorlib.com/theme/fashe/images/icons/visa.png' alt='IMG-VISA' />
          </a>
          <a href='#'>
            <img src='https://preview.colorlib.com/theme/fashe/images/icons/mastercard.png' alt='IMG-MASTERCARD' />
          </a>
          <a href='#'>
            <img src='https://preview.colorlib.com/theme/fashe/images/icons/express.png' alt='IMG-EXPRESS' />
          </a>
          <a href='#'>
            <img src='https://preview.colorlib.com/theme/fashe/images/icons/discover.png' alt='IMG-DISCOVER' />
          </a>
        </div>
        <h3 className='text-88 text-[13px] leading-4 pt-5'>Copyright © 2017 Nguyen Dinh Duong. All rights reserved.</h3>
      </div>
    </footer>
  )
}

export default Footer
