import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { FC, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

import authApi from '~/api/auth.api'
import Button from '~/components/Button'
import Helmet from '~/components/Helmet'
import { authForm as IFormInputs } from '~/types/commom'
import { isAxiosError } from '~/utils/utils'

type formError =
  | {
      [key in keyof IFormInputs]: string
    }
  | null

const SignUp: FC = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IFormInputs>()

  const { mutate, error } = useMutation({
    mutationFn: (body: IFormInputs) => {
      return authApi.signUp(body)
    }
  })

  const errorForm: formError = useMemo(() => {
    if (isAxiosError<{ error: formError }>(error) && error.response?.status === 422) {
      return error.response.data.error
    }
    return null
  }, [error])

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        localStorage.setItem('accessToken', response.data.accessToken)
        navigate('/dang-nhap')
      }
    })
  }

  return (
    <Helmet title='Đăng ký'>
      {/* <motion.div
        className='grid grid-cols-2'
        initial={{ y: '50px', opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.2 } }}
        exit={{ y: '50px', opacity: 0, transition: { duration: 0.2 } }}
      > */}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <div className='relative'>
                  <input
                    {...register('username', {
                      required: true
                    })}
                    onClick={() => delete errorForm?.username}
                    type='text'
                    placeholder='Tên đăng nhập'
                    className='input p-3 outline-none w-full z-20 border border-[#ccc] focus:border-text-88 focus:ring-1 focus:ring-text-88 focus:outline-none input active:outline-none rounded-md'
                  />
                  {errors.username && <span className='text-red-500'>Không được để trống trường này</span>}
                  {errorForm?.username && <span className='text-red-500'>{errorForm.username}</span>}
                </div>
              </div>
              <div className='space-y-2'>
                <div className='relative'>
                  <input
                    {...register('password', {
                      required: true
                    })}
                    onClick={() => delete errorForm?.password}
                    type='password'
                    placeholder='Mật khẩu'
                    className='input p-3 outline-none w-full z-20 border border-[#ccc] focus:border-text-88 focus:ring-1 focus:ring-text-88 focus:outline-none input active:outline-none rounded-md'
                  />
                  {errors.password && <span className='text-red-500'>Không được để trống trường này</span>}
                  {errorForm?.password && <span className='text-red-500'>{errorForm.password}</span>}
                </div>
              </div>
              <div className='space-y-2'>
                <div className='relative'>
                  <input
                    {...register('confirmPassword', {
                      required: true
                    })}
                    onClick={() => delete errorForm?.confirmPassword}
                    type='password'
                    placeholder='Nhập lại mật khẩu'
                    className='input p-3 outline-none w-full z-20 border border-[#ccc] focus:border-text-88 focus:ring-1 focus:ring-text-88 focus:outline-none input active:outline-none rounded-md'
                  />
                  {errors.confirmPassword && <span className='text-red-500'>Không được để trống trường này</span>}
                  {errorForm?.confirmPassword && <span className='text-red-500'>{errorForm.confirmPassword}</span>}
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
      {/* </motion.div> */}
    </Helmet>
  )
}

export default SignUp
