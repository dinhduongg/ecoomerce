import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const CartItem: FC = () => {
  return (
    <>
      <div className='text-start space-x-2 flex items-center'>
        <NavLink to='/' className='block w-16 h-16 lg:w-20 lg:h-20 overflow-hidden'>
          <img className='w-full h-full' src='https://preview.colorlib.com/theme/fashe/images/item-10.jpg' />
        </NavLink>
        <div>
          <span className='text-xs lg:text-base'>name</span>
          <p className='block lg:hidden'>1 x 10.000d</p>
        </div>
      </div>
      <p className='hidden lg:flex items-center text-start text-2xl'>
        <span className='text-lg font-extrabold'>10.000d</span>
      </p>
      <div className='justify-end lg:justify-start'>
        <span className='py-2 px-3 border border-[#353535] cursor-pointer hover:bg-[#ddd]'>-</span>
        <span className='py-2 px-5 border-t border-b border-t-[#353535] border-b-[#353535]'>0</span>
        <span className='py-2 px-3 border border-[#353535] cursor-pointer hover:bg-[#ddd]'>+</span>
      </div>
      <p className='hidden lg:flex items-center text-start text-2xl'>
        <span className='text-lg font-extrabold'>0</span>
      </p>
      <div>
        <div className='cursor-pointer hover:opacity-60 duration-150 h-fit'>
          <FontAwesomeIcon className='text-lg' icon={faXmarkCircle} />
        </div>
      </div>
    </>
  )
}

export default CartItem
