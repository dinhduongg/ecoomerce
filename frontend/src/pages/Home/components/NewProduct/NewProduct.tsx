import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductSlider from '~/components/ProductSlider'
import usePublicAxios from '~/hooks/usePublicAxios'
import { Query } from '~/shared/interface'
import { path } from '~/types/commom'

const NewProduct: FC<path> = ({ path }) => {
  const publicAxios = usePublicAxios()
  const [query, setQuery] = useState<Query>({ filters: { is_featured: true } })
  const { pathname } = useLocation()

  console.log(path, pathname)

  const { data: products, isFetching } = useQuery({
    queryKey: ['home-featured'],
    queryFn: () => publicAxios.get('/product', { params: query }),
    enabled: path === pathname,
    staleTime: 1000 * 60 * 10
  })

  return (
    <section className='max-w-7xl mx-auto pt-11 pb-28'>
      <div className='pb-14 text-center'>
        <h3 className='text-3xl text-[#222222] uppercase font-bold'>Sản phẩm đặc sắc</h3>
      </div>
      <ProductSlider products={products?.data ?? []} />
    </section>
  )
}

export default NewProduct
