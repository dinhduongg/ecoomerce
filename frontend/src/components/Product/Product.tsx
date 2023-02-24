import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../Button'

const Product: FC = () => {
  return (
    <div className='border border-[#e6e5e5]'>
      <div className='relative'>
        <img src='https://preview.colorlib.com/theme/fashe/images/item-02.jpg' alt='anh' />
        <div className='absolute w-full h-full top-0 lef-0 bg-[rgba(0,0,0,0.3)] opacity-0 transition-all duration-300 hover:opacity-100 group overflow-hidden'>
          <div className='absolute right-0 p-4 text-white text-2xl scale-0 group-hover:scale-100'>
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className='absolute left-2/4 -translate-x-2/4 transition-all duration-300 -bottom-5 group-hover:bottom-5 w-full'>
            <Button primary rounded custom='mx-auto'>
              Thêm vào giỏ
            </Button>
          </div>
        </div>
      </div>
      <div className='p-2'>
        <NavLink to='/' className='text-text-55 pb-1 duration-200 hover:text-button-hover'>
          Ten san pham
        </NavLink>
        <div className='space-x-2 text-text-55'>
          <span>gia</span>
          <span className='line-through'>giam gia</span>
        </div>
      </div>
    </div>
  )
}

export default Product
