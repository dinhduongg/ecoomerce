import { useQuery, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import shippingApi from '~/api/shipping.api'
import useDebounce from '~/hooks/useDebounce'
import { District, Province, Ward } from '~/shared/location.interface'

interface Props {
  search: string
  location: string
  setProvince: any
  setDistrict: any
  setWard: any
}

const Loaction: FC<Props> = ({ search, setProvince, setDistrict, setWard, location }) => {
  const [type, setType] = useState(0)
  const [isDisabled, setIsDisabled] = useState<number[]>([0])
  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [wards, setWards] = useState<Ward[]>([])
  const [provinceID, setProvinceID] = useState<number | undefined>(undefined)
  const [districtID, setDistrictID] = useState<number | undefined>(undefined)
  const queryClient = useQueryClient()

  const debounce = useDebounce(search, 500)

  const indexs = [
    { name: 'Tỉnh/Thành phố', active: 0 },
    { name: 'Quận/Huyện', active: 1 },
    { name: 'Phường/Xã', active: 2 }
  ]

  const { refetch: pRefetch } = useQuery({
    queryKey: ['provinces'],
    queryFn: () => shippingApi.getProvince({ search: debounce }),
    onSuccess: (response) => {
      setProvinces(response)
    }
  })

  const { refetch: dRefetch } = useQuery({
    queryKey: ['districts'],
    queryFn: () => shippingApi.getDistrict({ province_id: provinceID, search: debounce }),
    enabled: provinceID !== undefined,
    onSuccess: (response) => {
      setDistricts(response)
    }
  })

  const { refetch: wRefetch } = useQuery({
    queryKey: ['wards'],
    queryFn: () => shippingApi.getWard({ district_id: districtID, search: debounce }),
    enabled: districtID !== undefined,
    onSuccess: (response) => {
      setWards(response)
    }
  })

  const handleSetProvince = (province: Province) => {
    setProvince(province)
    setProvinceID(province.ProvinceID)
    setIsDisabled([0, 1])
    queryClient.prefetchQuery({
      queryKey: ['districts'],
      queryFn: () => shippingApi.getDistrict({ province_id: province.ProvinceID, search: debounce })
    })
    setType(1)
  }

  const handleSetDistrict = (district: District) => {
    setDistrict(district)
    setDistrictID(district.DistrictID)
    setIsDisabled([0, 1, 2])
    queryClient.prefetchQuery({
      queryKey: ['wards'],
      queryFn: () => shippingApi.getWard({ district_id: district.DistrictID })
    })
    setType(2)
  }

  const handleSetWard = (ward: Ward) => {
    setWard(ward)
  }

  useEffect(() => {
    switch (type) {
      case 0:
        pRefetch()
        break
      case 1:
        dRefetch()
        break
      case 2:
        wRefetch()
        break
      default:
        break
    }
  }, [debounce])

  useEffect(() => {
    if (location == '') {
      setType(0)
      setIsDisabled([0])
    }
  }, [location])

  return (
    <div className='border relative'>
      <div className='grid grid-cols-3'>
        {indexs.map((item, index) => {
          return (
            <button
              disabled={!isDisabled.includes(index)}
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
      <div className='absolute w-full z-50 max-h-60 bg-white border-x border-b shadow-2xl overflow-auto'>
        {type === 0 &&
          provinces.map((province) => {
            return (
              <div
                key={province.ProvinceID}
                className='p-2 hover:bg-slate-200 cursor-pointer'
                onClick={() => handleSetProvince(province)}
              >
                {province.ProvinceName}
              </div>
            )
          })}
        {type === 1 &&
          districts.map((district) => {
            return (
              <div
                key={district.DistrictID}
                className='p-2 hover:bg-slate-200 cursor-pointer'
                onClick={() => handleSetDistrict(district)}
              >
                {district.DistrictName}
              </div>
            )
          })}
        {type === 2 &&
          wards.map((ward) => {
            return (
              <div
                key={ward.WardCode}
                className='p-2 hover:bg-slate-200 cursor-pointer'
                onClick={() => handleSetWard(ward)}
              >
                {ward.WardName}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Loaction
