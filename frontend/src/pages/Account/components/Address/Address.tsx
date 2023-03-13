import { faCircleXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import Button from '~/components/Button'
import Modal from '~/components/Modal'
import Loaction from '~/components/Loaction'
import { District, Province, Ward } from '~/shared/location.interface'

const Address: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [province, setProvince] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [ward, setWard] = useState<string>('')
  const [showLocation, setShowLocation] = useState<boolean>(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = (data: any) => {
    setIsModalOpen(data)
    setLocation('')
    setProvince('')
    setDistrict('')
    setSearch('')
    setWard('')
    setShowLocation(false)
  }

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSetProvince = (data: Province) => {
    setProvince(data.ProvinceName)
    setSearch('')
  }

  const handleSetDistrict = (data: District) => {
    setDistrict(data.DistrictName)
    setSearch('')
  }

  const handleSetWard = (data: Ward) => {
    setWard(data.WardName)
    setSearch('')
  }

  const handleReset = () => {
    setLocation('')
    setProvince('')
    setDistrict('')
    setSearch('')
    setWard('')
  }

  useEffect(() => {
    const location = `${province}${district ? `, ${district}` : ''}${ward ? `, ${ward}` : ''}`
    setLocation(location)

    if (province && district && ward) {
      setShowLocation(false)
    }
  }, [province, district, ward])

  useEffect(() => {
    if (location == '') {
      setProvince('')
      setDistrict('')
      setWard('')
    }
  }, [location])

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
              <div className='grid grid-cols-3 space-y-4'>
                <div className='col-span-full relative'>
                  {location && (
                    <div className='absolute top-2/4 -translate-y-2/4 right-2 cursor-pointer' onClick={handleReset}>
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </div>
                  )}
                  <input
                    disabled
                    value={location}
                    onChange={(e) => handleChangeLocation(e)}
                    type='text'
                    placeholder='Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'
                    className='input !py-2 !rounded w-full truncate'
                  />
                </div>
                <div className='col-span-full relative'>
                  <input
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    type='text'
                    placeholder='Tìm kiếm'
                    className='input !py-2 !rounded w-full truncate'
                    onFocus={() => setShowLocation(true)}
                  />
                </div>
                {showLocation && (
                  <div className='col-span-full'>
                    <Loaction
                      search={search}
                      setProvince={handleSetProvince}
                      setDistrict={handleSetDistrict}
                      setWard={handleSetWard}
                      location={location}
                    />
                  </div>
                )}
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
