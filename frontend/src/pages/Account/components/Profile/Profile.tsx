import { FC } from 'react'
import { Link } from 'react-router-dom'
import { secureInfo } from '~/utils/utils'

const Profile: FC = () => {
  return (
    <div>
      <div>
        <h3>Hồ sơ của tôi</h3>
        <p>Quản lý thông tin hồ sơ để bảo mật an toàn</p>
      </div>
      <div className='grid grid-cols-12 gap-4 items-center'>
        <div className='col-span-2 text-right'>Tên đăng nhập: </div>
        <input type='text' className='input !py-1 col-span-3' />
      </div>
      <div className='grid grid-cols-12 gap-4 items-center'>
        <div className='col-span-2 text-right'>Email: </div>
        <span className='flex col-span-3'>
          <span>{secureInfo('leduongdatly@gmail.com', 'email')}</span>
          <Link to='/' className='text-blue-500 underline'>
            Thay đổi
          </Link>
        </span>
      </div>
      <div className='grid grid-cols-12 gap-4 items-center'>
        <div className='col-span-2 text-right'>Số điện thoại: </div>
        <span className='flex col-span-3'>
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
    </div>
  )
}

export default Profile
