import { faCircleXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { AnimatePresence } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import Button from '~/components/Button'
import Loaction from '~/components/Loaction'
import Modal from '~/components/Modal'
import { Address as IAddress } from '~/shared/account.interface'
import { AddressType } from '~/shared/enum'
import { District, Province, Ward } from '~/shared/location.interface'

const Address: FC = () => {
  const [fullname, setFullname] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [province, setProvince] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [ward, setWard] = useState<string>('')
  const [detailAddress, setDetailAddress] = useState<string>('')
  const [addressType, setAddressType] = useState<AddressType>(AddressType.HOME)
  const [error, setError] = useState<any | undefined>()

  const [search, setSearch] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [showLocation, setShowLocation] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const resetState = () => {
    setLocation('')
    setProvince('')
    setDistrict('')
    setSearch('')
    setWard('')
    setFullname('')
    setPhone('')
    setDetailAddress('')
    setAddressType(AddressType.HOME)
    setError(undefined)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = (data: any) => {
    setShowLocation(false)
    setIsModalOpen(data)
    resetState()
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
    delete error?.location
  }

  const handleSetDistrict = (data: District) => {
    setDistrict(data.DistrictName)
    setSearch('')
    delete error?.location
  }

  const handleSetWard = (data: Ward) => {
    setWard(data.WardName)
    setSearch('')
    delete error?.location
  }

  const handleReset = () => {
    setLocation('')
    setProvince('')
    setDistrict('')
    setSearch('')
    setWard('')
  }

  const handleAddressType = (type: AddressType) => {
    setAddressType(type)
  }

  const handleSubmit = (data: boolean) => {
    if (!fullname) setError((prev: any) => ({ ...prev, fullname: 'Không được để trống' }))
    if (!phone) setError((prev: any) => ({ ...prev, phone: 'Không được để trống' }))
    if (!province && !district && !ward) setError((prev: any) => ({ ...prev, location: 'Không được để trống' }))
    if (!detailAddress) setError((prev: any) => ({ ...prev, detailAddress: 'Không được để trống' }))
    if (!addressType) setError((prev: any) => ({ ...prev, addressType: 'Không được để trống' }))

    // if (data) {
    //   if (error) {
    //     console.log('error: ', error.fullname)
    //     return
    //   }

    //   const address: IAddress = {
    //     city_province: province,
    //     district: district,
    //     wards: ward,
    //     detail_address: detailAddress,
    //     isMain: true,
    //     addressType: addressType
    //   }

    //   console.log('address: ', address)
    // }
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
          <Modal title='Thêm địa chỉ mới' handleCloseModal={handleCloseModal} handleSubmit={handleSubmit}>
            <form className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <div className='flex flex-col'>
                  <input
                    name='fullname'
                    value={fullname}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFullname(e.target.value)
                      delete error?.fullname
                    }}
                    type='text'
                    placeholder='Họ và tên'
                    className={classNames('input !py-2 !rounded', {
                      'placeholder:text-red-500 !border-red-500': error?.fullname
                    })}
                  />
                </div>
                <div className='flex flex-col'>
                  <input
                    name='phone'
                    value={phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPhone(e.target.value)
                      delete error?.phone
                    }}
                    type='text'
                    placeholder='Số điện thoại'
                    className={classNames('input !py-2 !rounded', {
                      'placeholder:text-red-500 !border-red-500': error?.phone
                    })}
                  />
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
                    className={classNames('input !py-2 !rounded w-full truncate', {
                      'placeholder:text-red-500 !border-red-500': error?.location
                    })}
                  />
                </div>
                <div className='col-span-full relative'>
                  <input
                    disabled={location !== ''}
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    type='text'
                    placeholder='Tìm kiếm / chọn địa chỉ'
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
                <textarea
                  placeholder='Địa chỉ cụ thể'
                  name='detailAddress'
                  value={detailAddress}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setDetailAddress(e.target.value)
                    delete error?.detailAddress
                  }}
                  className={classNames('input', {
                    'placeholder:text-red-500 !border-red-500': error?.detailAddress
                  })}
                />
              </div>
              <div>
                <span>Loại địa chỉ</span>
                <div className='flex items-center space-x-3'>
                  <span
                    onClick={() => handleAddressType(AddressType.HOME)}
                    className={classNames('border px-3 py-2 cursor-pointer', {
                      'border-button-hover text-button-hover': addressType === AddressType.HOME
                    })}
                  >
                    Nhà riêng
                  </span>
                  <span
                    onClick={() => handleAddressType(AddressType.OFFICE)}
                    className={classNames('border px-3 py-2 cursor-pointer', {
                      'border-button-hover text-button-hover': addressType === AddressType.OFFICE
                    })}
                  >
                    Văn phòng
                  </span>
                </div>
              </div>
              <div className='flex items-center mb-4'>
                <input
                  id='default-checkbox'
                  type='checkbox'
                  value=''
                  className='w-4 h-4 outline-none text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
                />
                <label htmlFor='default-checkbox' className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Đặt làm địa chỉ mặt định
                </label>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Address
