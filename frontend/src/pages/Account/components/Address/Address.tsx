import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { FC, useState } from 'react'
import shippingApi from '~/api/shipping.api'
import Button from '~/components/Button'
import Modal from '~/components/Modal'

const Address: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = (data: any) => {
    setIsModalOpen(data)
  }

  useQuery({
    queryKey: ['location'],
    queryFn: () => shippingApi.getProvince({})
  })

  return (
    <div>
      <div className='px-7 py-6 border-b flex items-center justify-between'>
        <h3>Địa chỉ của tôi</h3>
        <Button primary onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faPlus} />
          <span className='ml-2'>Thêm địa chỉ mới</span>
        </Button>
      </div>

      {/* modal */}
      <AnimatePresence initial={false} mode='wait'>
        {isModalOpen && (
          <Modal title='Thêm địa chỉ mới' handleCloseModal={handleCloseModal}>
            <form className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <div>
                  <input type='text' placeholder='Họ và tên' className='input !py-2 !rounded' />
                </div>
                <div>
                  <input type='text' placeholder='Số điện thoại' className='input !py-2 !rounded' />
                </div>
              </div>
              <div className='grid grid-cols-3'>
                <div className='col-span-full'>
                  <input
                    type='text'
                    placeholder='Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'
                    className='input !py-2 !rounded w-full'
                  />
                </div>
                <div className='lg:hidden col-span-full grid grid-cols-3'>
                  <div>Tỉnh/Thành phố</div>
                  <div>Quận/Huyện</div>
                  <div>Phường/Xã</div>
                </div>
              </div>
              <div>
                <textarea placeholder='Địa chỉ cụ thể' className='input' />
              </div>
              <div>
                <span>Loại địa chỉ</span>
                <div className='flex items-center space-x-3'>
                  <span className='border px-3 py-2 cursor-pointer'>Nhà riêng</span>
                  <span className='border border-button-hover text-button-hover px-3 py-2 cursor-pointer'>
                    Văn phòng
                  </span>
                </div>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Address
