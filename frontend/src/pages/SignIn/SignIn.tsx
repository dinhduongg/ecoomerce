import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { FC, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import authApi from '~/api/auth.api'
import Button from '~/components/Button'
import Helmet from '~/components/Helmet'
import useAuth from '~/hooks/useAuth'
import { authForm as aForm } from '~/types/commom'
import { isAxiosError } from '~/utils/utils'

type IFormInputs = Omit<aForm, 'confirmPassword'>

type formError =
  | {
      [key in keyof IFormInputs]: string
    }
  | null

const SignIn: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const { auth, setAuth } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IFormInputs>()

  const { mutate, error } = useMutation({
    mutationFn: (body: IFormInputs) => {
      return authApi.signIn(body)
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
      onSuccess: (response: any) => {
        localStorage.setItem('accessToken', response?.accessToken)
        localStorage.setItem('cartCount', response?.cartCount)
        setAuth((prev) => ({
          ...prev,
          ...response.data
        }))
        navigate(from, { replace: true })
      }
    })
  }

  return (
    <Helmet title='Đăng nhập'>
      <motion.div
        className='grid grid-cols-2'
        initial={{ y: '50px', opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.2 } }}
        exit={{ y: '50px', opacity: 0, transition: { duration: 0.2 } }}
      >
        <div className='col-span-full lg:col-span-1 flex items-center justify-center'>
          <div className='w-full px-2 py-5 lg:w-2/4'>
            <div className='mb-6 flex items-center justify-between'>
              <h3 className='font-bold text-4xl mb-2'>Đăng nhập</h3>
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
                      name='username'
                      placeholder='Tên đăng nhập'
                      className='input'
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
                      name='password'
                      placeholder='Mật khẩu'
                      className='input'
                    />
                    {errors.password && <span className='text-red-500'>Không được để trống trường này</span>}
                    {errorForm?.password && <span className='text-red-500'>{errorForm.password}</span>}
                  </div>
                </div>
              </div>
              <div className='text-center my-4 space-x-1'>
                <NavLink className='hover:text-button-hover underline' to='/'>
                  Quên mật khẩu
                </NavLink>
                <span>hoặc</span>
                <NavLink className='text-button-hover font-bold' to='/dang-ky'>
                  Đăng ký
                </NavLink>
              </div>
              <Button primary full custom='h-12' type='submit'>
                Đăng nhập
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
        <div
          className='left hidden lg:block w-full h-screen bg-no-repeat bg-cover bg-center'
          style={{
            backgroundImage: `url("https://cdn.pixabay.com/photo/2021/11/15/05/25/boutique-6796399_960_720.jpg")`
          }}
        ></div>
      </motion.div>
    </Helmet>
  )
}

export default SignIn
