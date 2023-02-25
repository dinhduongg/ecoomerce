import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import ProductSlider from '~/components/ProductSlider'
import usePublicAxios from '~/hooks/usePublicAxios'
import { Query } from '~/shared/interface'

const NewProduct: FC = () => {
  const publicAxios = usePublicAxios()
  const [query, setQuery] = useState<Query>({ filters: { is_featured: true } })

  const { data: products, isFetching } = useQuery({
    queryKey: ['home-featured'],
    queryFn: () => {
      return publicAxios.get('/product', { params: query })
    },
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
