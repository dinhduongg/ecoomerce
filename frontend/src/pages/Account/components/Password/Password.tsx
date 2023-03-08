import { FC } from 'react'
import Button from '~/components/Button'

const Password: FC = () => {
  return (
    <div>
      <div className='px-7 py-6 border-b'>
        <h3>Đổi mật khẩu</h3>
        <p className='text-sm text-gray-500'>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
      </div>
      <form className='space-y-2 my-4'>
        <div className='grid grid-cols-12 gap-4 items-center'>
          <div className='col-span-2 text-right'>Mật khẩu hiện tại: </div>
          <input type='text' className='input !py-1 col-span-3' />
        </div>
        <div className='grid grid-cols-12 gap-4 items-center'>
          <div className='col-span-2 text-right'>Mật khẩu mới: </div>
          <input type='text' className='input !py-1 col-span-3' />
        </div>
        <div className='grid grid-cols-12 gap-4 items-center'>
          <div className='col-span-2 text-right'>Xác nhận mật khẩu: </div>
          <input type='text' className='input !py-1 col-span-3' />
        </div>
        <div className='grid grid-cols-12 gap-4 items-center'>
          <div className='col-span-2 text-right'></div>
          <div className='col-span-10'>
            <Button disabled primary>
              Cập nhật
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Password
