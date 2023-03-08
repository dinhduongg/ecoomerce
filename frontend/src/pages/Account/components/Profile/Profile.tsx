import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Button from '~/components/Button'
import { secureInfo } from '~/utils/utils'

import 'react-datepicker/dist/react-datepicker.css'

const Profile: FC = () => {
  const [date, setDate] = useState(new Date())
  console.log(date.toISOString())

  return (
    <div>
      <div className='px-7 py-6 border-b'>
        <h3>Hồ sơ của tôi</h3>
        <p className='text-sm text-gray-500'>Quản lý thông tin hồ sơ để bảo mật an toàn</p>
      </div>
      <div className='py-6 space-y-4'>
        <div className='grid grid-cols-12 gap-4 items-center'>
          <div className='col-span-2 text-right'>Tên đăng nhập: </div>
          <input type='text' className='input !py-1 col-span-3' />
        </div>
        <div className='grid grid-cols-12 gap-4 items-center'>
          <div className='col-span-2 text-right'>Email: </div>
          <span className='flex col-span-3 space-x-4'>
            <span>{secureInfo('leduongdatly@gmail.com', 'email')}</span>
            <Link to='/' className='text-blue-500 underline'>
              Thay đổi
            </Link>
          </span>
        </div>
        <div className='grid grid-cols-12 gap-4 items-center'>
          <div className='col-span-2 text-right'>Số điện thoại: </div>
          <span className='flex col-span-3 space-x-4'>
            <span>{secureInfo('0941356960', 'phone')}</span>
            <Link to='/' className='text-blue-500 underline'>
              Thay đổi
            </Link>
          </span>
        </div>
        <div className='grid grid-cols-12 gap-4 items-center'>
          <div className='col-span-2 text-right'>Giới tính: </div>
          <div className='col-span-10 flex items-center space-x-3'>
            <div className='space-x-1'>
              <input type='radio' name='gender' value='male' id='male' />
              <label htmlFor='male'>Nam</label>
            </div>
            <div className='space-x-1'>
              <input type='radio' name='gender' value='female' id='female' />
              <label htmlFor='female'>Nữ</label>
            </div>
            <div className='space-x-1'>
              <input type='radio' name='gender' value='orther' id='orther' />
              <label htmlFor='orther'>Khác</label>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4 items-center'>
          <div className='col-span-2 text-right'>Ngày sinh: </div>
          <div className='col-span-3 flex items-center space-x-3'>
            <DatePicker
              dateFormat='dd-MM-yyyy'
              closeOnScroll={(e) => e.target === document}
              className='input !py-1 col-span-3 !w-fit z-20'
              selected={date}
              onChange={(date) => setDate(date!)}
            />
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4 items-center'>
          <div className='col-span-2 text-right'></div>
          <Button primary>Lưu</Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
