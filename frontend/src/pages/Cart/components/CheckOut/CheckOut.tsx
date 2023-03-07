import { FC } from 'react'
import Button from '~/components/Button'
import useCartCount from '~/hooks/useCartCount'
import { Cart } from '~/shared/cart.interface'
import { vietnameseCurrency } from '~/utils/utils'

interface Props {
  userCart: Cart
}

const CheckOut: FC<Props> = ({ userCart }) => {
  const { count } = useCartCount()

  return (
    <div className='mt-6 lg:mt-0 col-span-1 lg:col-span-2'>
      <div className='gtable grid grid-cols-1 p-4'>
        <h6>Hóa đơn</h6>
        <div className='!py-4 flex items-center justify-between'>
          <span className='text-lg'>Số lượng sản phẩm</span>
          <span className='text-lg font-bold'>{count}</span>
        </div>
        <div className='!py-4 flex items-center justify-between'>
          <span className='text-lg'>Tổng tiền</span>
          <span className='text-lg font-bold'>{vietnameseCurrency(userCart?.total_money)}</span>
        </div>
        <Button to='/thanh-toan' primary custom='rounded-none'>
          Tiến hành thanh toán
        </Button>
        {/* <div className='!py-4 flex items-center space-x-2'>
          <FontAwesomeIcon className='opacity-60 text-lg' icon={faTag} />
          <span className='text-lg'>Phiếu ưu đãi</span>
        </div>
        <div className='!py-4'>
          <input
            className='border border-[#ddd] outline-none w-full p-2 text-base'
            type='text'
            placeholder='Nhập mã ưu đãi'
          />
        </div>
        <Button custom='border border-[#ddd] rounded-none bg-[#f9f9f9] hover:shadow-header-btn text-[#666]'>
          Áp dụng
        </Button> */}
      </div>
    </div>
  )
}

export default CheckOut
