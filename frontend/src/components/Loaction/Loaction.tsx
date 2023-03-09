import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { FC, useState } from 'react'
import shippingApi from '~/api/shipping.api'
import { Province } from '~/shared/location.interface'

const Loaction: FC = () => {
  const [type, setType] = useState(1)
  const [provinces, setProvinces] = useState<Province[]>([])

  const indexs = [
    { name: 'Tỉnh/Thành phố', active: 1 },
    { name: 'Quận/Huyện', active: 2 },
    { name: 'Phường/Xã', active: 3 }
  ]

  useQuery({
    queryKey: ['province'],
    queryFn: () => shippingApi.getProvince({}),
    onSuccess: (data) => {
      setProvinces(data)
    }
  })

  return (
    <div className='border relative'>
      <div className='grid grid-cols-3'>
        {indexs.map((item, index) => {
          return (
            <button
              onClick={() => setType(item.active)}
              key={index}
              type='button'
              className={classNames('p-2 border-b-2', {
                'text-button-hover border-b-button-hover': type === item.active
              })}
            >
              {item.name}
            </button>
          )
        })}
      </div>
      <div className='absolute w-full z-50 max-h-60 bg-white border-x border-b overflow-auto'>
        {type === 1 &&
          provinces.map((province) => {
            return (
              <div key={province.ProvinceID} className='p-2 hover:bg-slate-200 cursor-pointer'>
                {province.ProvinceName}
              </div>
            )
          })}
        {type === 2 && (
          <div>
            <div className='p-2 hover:bg-slate-200 cursor-pointer'>quan huyen</div>
          </div>
        )}
        {type === 3 && (
          <div>
            <div className='p-2 hover:bg-slate-200 cursor-pointer'>phuong xa</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Loaction
