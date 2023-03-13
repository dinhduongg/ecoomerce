import { FC, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'

import Button from '~/components/Button'
import { secureInfo } from '~/utils/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import userApi from '~/api/user.api'
import useAuth from '~/hooks/useAuth'
import { Gender } from '~/shared/enum'
import { profileForm } from '~/types/commom'
import { toast } from 'react-toastify'

const initValue: profileForm = {
  fullname: '',
  gender: Gender.MALE,
  birthday: new Date(),
  email: '',
  phone: ''
}

const Profile: FC = () => {
  const [profile, setProfile] = useState<profileForm>(initValue)
  const [errors, setErrors] = useState<any>({})
  const { auth } = useAuth()
  const queryClient = useQueryClient()

  useQuery({
    queryKey: ['user-info', auth?.username],
    queryFn: () => userApi.getInfo(),
    onSuccess: (data) => {
      setProfile({
        fullname: data.fullname ?? '',
        email: data.email ?? '',
        phone: data.phone ?? '',
        gender: data.gender ?? Gender.MALE,
        birthday: data.birthday ? new Date(data.birthday!) : new Date()
      })
    }
  })

  const { mutate } = useMutation({
    mutationFn: (dto: profileForm) => {
      return userApi.updateUser(dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-info', auth?.username] })
      setErrors({})
    }
  })

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (!profile.fullname) {
      setErrors({ fullname: 'Bắt buộc điền' })
    }
    mutate(profile)
  }

  return (
    <div>
      <div className='px-7 py-6 border-b'>
        <h3>Hồ sơ của tôi</h3>
        <p className='text-sm text-gray-500'>Quản lý thông tin hồ sơ để bảo mật an toàn</p>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='py-6 space-y-4'>
          <div className='grid grid-cols-12 gap-4 items-center'>
            <div className='col-span-2 text-right'>Họ và tên: </div>
            <input
              value={profile.fullname}
              onChange={(e) => setProfile((prev) => ({ ...prev, fullname: e.target.value }))}
              type='text'
              className='input !py-1 col-span-3'
            />
            {errors.fullname && <span className='text-red-500'>{errors.fullname}</span>}
          </div>
          <div className='grid grid-cols-12 gap-4 items-center'>
            <div className='col-span-2 text-right'>Email: </div>
            <span className='flex col-span-3 space-x-4'>
              <span>{profile.email ? secureInfo(profile.email, 'email') : 'Bạn chưa nhập email'}</span>
              <Link to='/' className='text-blue-500 underline'>
                Thay đổi
              </Link>
            </span>
          </div>
          <div className='grid grid-cols-12 gap-4 items-center'>
            <div className='col-span-2 text-right'>Số điện thoại: </div>
            <span className='flex col-span-4 space-x-4'>
              <span>{profile.phone ? secureInfo(profile.phone, 'phone') : 'Bạn chưa nhập số điện thoại'}</span>
              <Link to='/' className='text-blue-500 underline'>
                Thay đổi
              </Link>
            </span>
          </div>
          <div className='grid grid-cols-12 gap-4 items-center'>
            <div className='col-span-2 text-right'>Giới tính: </div>
            <div className='col-span-10 flex items-center space-x-3'>
              <div className='space-x-1'>
                <input
                  type='radio'
                  value={Gender.MALE}
                  onChange={(e: any) => setProfile((prev) => ({ ...prev, gender: e.target.value }))}
                  checked={profile?.gender === 'male'}
                  id='male'
                />
                <label htmlFor='male'>Nam</label>
              </div>
              <div className='space-x-1'>
                <input
                  type='radio'
                  value={Gender.FEMALE}
                  onChange={(e: any) => setProfile((prev) => ({ ...prev, gender: e.target.value }))}
                  checked={profile?.gender === 'female'}
                  id='female'
                />
                <label htmlFor='female'>Nữ</label>
              </div>
              <div className='space-x-1'>
                <input
                  type='radio'
                  value={Gender.ORTHER}
                  onChange={(e: any) => setProfile((prev) => ({ ...prev, gender: e.target.value }))}
                  checked={profile?.gender === 'orther'}
                  id='orther'
                />
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
                selected={profile.birthday}
                onChange={(date) => setProfile((prev) => ({ ...prev, birthday: date! }))}
              />
            </div>
          </div>
          <div className='grid grid-cols-12 gap-4 items-center'>
            <div className='col-span-2 text-right'></div>
            <Button primary>Lưu</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
