import { faArrowLeftLong, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import cartApi from '~/api/cart.api'
import Button from '~/components/Button'
import Helmet from '~/components/Helmet'
import CartItem from './components/CartItem'
import CheckOut from './components/CheckOut'

const Cart: FC = () => {
  const { data: userCart, isLoading } = useQuery({
    queryKey: ['userCart'],
    queryFn: () => cartApi.getUserCart({})
  })

  return (
    <Helmet title='Giỏ hàng'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-col-1 lg:grid-cols-5 gap-0 lg:gap-6 py-7 px-2'>
          <div className='col-span-1 lg:col-span-3'>
            <div className='gtable grid grid-cols-2 lg:grid-cols-[40%_20%_20%_16%_4%] px-1 py-1'>
              <h6 className='pl-2 uppercase'>Sản phẩm</h6>
              <h6 className='pl-2 hidden lg:block uppercase'>Giá</h6>
              <h6 className='pl-2 uppercase text-end lg:text-start'>Số lượng</h6>
              <h6 className='pl-2 hidden lg:block uppercase'>Tổng</h6>
              <h6></h6>
              {userCart &&
                userCart.products.length !== 0 &&
                userCart.products.map((cart, index) => {
                  return <CartItem cart={cart} key={index} />
                })}
            </div>
            {!userCart ||
              (userCart.products.length === 0 && (
                <div className='col-span-full w-full text-center border-x border-b border-[#ccc] text-xl py-4'>
                  Giỏ hàng của bạn không có gì
                </div>
              ))}
            <div className='flex flex-col lg:flex-row items-start lg:items-center justify-start space-x-0 lg:space-x-4 space-y-2 lg:space-y-0 pt-4'>
              <Button to='/' outline custom='w-auto'>
                <FontAwesomeIcon icon={faArrowLeftLong} />
                <span className='ml-2'>Tiếp tục xem sản phẩm</span>
              </Button>
            </div>
          </div>
          <CheckOut userCart={userCart!} />
        </div>
      </div>
    </Helmet>
  )
}

export default Cart
