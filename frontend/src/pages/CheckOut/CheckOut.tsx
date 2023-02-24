import { FC, useState } from 'react'
import Button from '~/components/Button'
import Helmet from '~/components/Helmet'

const Checkout: FC = () => {
  const [payment, setPayment] = useState<string>('pay1')

  return (
    <Helmet title='Thanh toán'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 py-7 px-2'>
          <div className='col-span-1 lg:col-span-3 space-y-4 pt-4 border-t border-t-[#ccc]'>
            <h2 className='uppercase text-lg font-bold'>Thông tin thanh toán</h2>
            <div>
              <p className='text-base font-bold'>Họ và tên *</p>
              <input
                className='border border-[#ccc] outline-none w-full text-base p-2 focus:border-text-88'
                type='text'
                placeholder='Họ và tên'
              />
            </div>
            <div>
              <p className='text-base font-bold'>Địa chỉ *</p>
              <input
                className='border border-[#ccc] outline-none w-full text-base p-2 focus:border-text-88'
                type='text'
                placeholder='Số nhà, đường'
              />
            </div>
            <div>
              <p className='text-base font-bold'>Tỉnh / Thành phố *</p>
              <input
                className='border border-[#ccc] outline-none w-full text-base p-2 focus:border-text-88'
                type='text'
                placeholder='Tỉnh / Thành phố'
              />
            </div>
            <div>
              <p className='text-base font-bold'>Số điện thoại *</p>
              <input
                className='border border-[#ccc] outline-none w-full text-base p-2 focus:border-text-88'
                type='text'
                placeholder='Số điện thoại'
              />
            </div>
            <div>
              <p className='text-base font-bold'>Địa chỉ email *</p>
              <input
                className='border border-[#ccc] outline-none w-full text-base p-2 focus:border-text-88'
                type='text'
                placeholder='Địa chỉ email'
              />
            </div>
            <div>
              <p className='text-base font-bold'>Ghi chú đơn hàng (tùy chọn)</p>
              <textarea
                className='border border-[#ccc] outline-none w-full text-base p-2 focus:border-text-88'
                rows={4}
                placeholder='Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết hơn'
              />
            </div>
          </div>
          <div className='mt-6 lg:mt-0 col-span-1 lg:col-span-2'>
            <div className='gtable grid grid-cols-1 p-4'>
              <h6 className='!text-lg uppercase font bold'>Đơn hàng của bạn</h6>
              <div className='justify-between uppercase font-medium'>
                <span className='text-sm'>Sán phẩm</span>
                <span className='text-sm'>Tổng</span>
              </div>
              <span className='!py-4 justify-between uppercase font-medium'>
                {/* loop here */}
                <div className='flex justify-between items-center py-1'>
                  <span className='text-sm'>Casio x 1</span>
                  <span className='text-sm'>700.000đ</span>
                </div>
              </span>
              <div className='!py-4 justify-between uppercase font-medium'>
                <span className='text-sm'>Mã giảm giá</span>
                <span className='text-sm'>GIAM50</span>
              </div>
              <div className='!py-4 justify-between uppercase font-medium'>
                <span className='text-sm'>Tổng</span>
                <span className='text-sm'>700.000đ</span>
              </div>
              <div className='!py-4 flex-col !items-start font-medium'>
                <label className='flex items-center space-x-2 text-sm mb-2 cursor-pointer'>
                  <input
                    type='radio'
                    value='pay1'
                    checked={payment === 'pay1'}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>Thanh toán khi nhận hàng</span>
                </label>
                <div
                  className={`w-full duration-500 text-base font-normal ${
                    payment === 'pay1' ? `max-h-[24px] overflow-clip` : 'max-h-0 overflow-hidden'
                  }`}
                >
                  Trả tiền mặt khi giao hàng
                </div>
              </div>
              <div className='!py-4 flex-col !items-start font-medium'>
                <label className='flex items-center space-x-2 text-sm mb-2 cursor-pointer'>
                  <input
                    type='radio'
                    value='pay2'
                    checked={payment === 'pay2'}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>Thanh toán trực tuyến</span>
                </label>
                <div
                  className={`w-full duration-500 text-base font-normal ${
                    payment === 'pay2' ? `max-h-[72px] overflow-clip` : 'max-h-0 overflow-hidden'
                  }`}
                >
                  Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn
                  trong phần Nội dung thanh toán. Đơn hàng sẽ đươc giao sau khi tiền đã chuyển.
                </div>
              </div>
              <Button primary custom='rounded-none'>
                Đặt hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  )
}

export default Checkout
