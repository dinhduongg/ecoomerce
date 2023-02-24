import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import Button from '~/components/Button'
import Helmet from '~/components/Helmet'

import { authForm as IFormInputs } from '~/types/commom'

type formError =
  | {
      [key in keyof IFormInputs]: string
    }
  | null

const initState: IFormInputs = {
  username: '',
  password: '',
  confirmPassword: ''
}

const SignUp: FC = () => {
  return (
    <Helmet title='Đăng ký'>
      <motion.div
        className='grid grid-cols-2'
        initial={{ y: '50px', opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.2 } }}
        exit={{ y: '50px', opacity: 0, transition: { duration: 0.2 } }}
      >
        <div
          className='right hidden lg:block w-full h-screen bg-no-repeat bg-cover bg-center'
          style={{
            backgroundImage: `url("https://cdn.pixabay.com/photo/2020/05/03/19/09/nike-5126389_960_720.jpg")`
          }}
        ></div>
        <div className='col-span-full lg:col-span-1 flex items-center justify-center'>
          <div className='w-full lg:w-2/4 px-2 py-5'>
            <div className='mb-6 flex items-center justify-between'>
              <h3 className='font-bold text-4xl mb-2'>Đăng ký</h3>
              <NavLink className='font-bold hover:text-button-hover duration-200' to='/'>
                Trang chủ
              </NavLink>
            </div>
            <p className='mb-6'>Chào mừng bạn đến với chúng tôi</p>
            <form>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <div className='relative'>
                    <input
                      type='text'
                      name='username'
                      placeholder='Tên đăng nhập'
                      className='input p-3 outline-none w-full z-20 border border-[#ccc] focus:border-text-88 focus:ring-1 focus:ring-text-88 focus:outline-none input active:outline-none rounded-md'
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='relative'>
                    <input
                      type='password'
                      name='password'
                      placeholder='Mật khẩu'
                      className='input p-3 outline-none w-full z-20 border border-[#ccc] focus:border-text-88 focus:ring-1 focus:ring-text-88 focus:outline-none input active:outline-none rounded-md'
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='relative'>
                    <input
                      type='password'
                      name='confirmPassword'
                      placeholder='Nhập lại mật khẩu'
                      className='input p-3 outline-none w-full z-20 border border-[#ccc] focus:border-text-88 focus:ring-1 focus:ring-text-88 focus:outline-none input active:outline-none rounded-md'
                    />
                  </div>
                </div>
              </div>
              <div className='text-center my-4 space-x-2'>
                <span>Đã có tài khoản</span>
                <NavLink className='text-button-hover' to='/dang-nhap'>
                  Đăng nhập
                </NavLink>
              </div>
              <Button primary full custom='h-12' type='submit'>
                Đăng ký
              </Button>
            </form>
            <span className='text-[#6c757d] flex justify-center my-6'>- Hoặc -</span>
            <div className='space-y-2'>
              <div className='flex items-center justify-center bg-[#3b5998] text-white h-14 space-x-4 rounded hover:shadow-header-btn duration-200 cursor-pointer'>
                <FontAwesomeIcon icon={faFacebookF} />
                <span>Đăng nhập với Facebook</span>
              </div>
              <div className='flex items-center justify-center bg-[#1da1f2] text-white h-14 space-x-4 rounded hover:shadow-header-btn duration-200 cursor-pointer'>
                <FontAwesomeIcon icon={faGoogle} />
                <span>Đăng nhập với Google</span>
              </div>
              <div className='flex items-center justify-center bg-[#ea4335] text-white h-14 space-x-4 rounded hover:shadow-header-btn duration-200 cursor-pointer'>
                <FontAwesomeIcon icon={faTwitter} />
                <span>Đăng nhập với Twitter</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Helmet>
  )
}

export default SignUp
