import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import ProductSlider from '~/components/ProductSlider'
import { Query } from '~/shared/interface'
import { Product } from '~/shared/product.interface'
import { path } from '~/types/commom'
import { publicAxios } from '~/utils/axiosClient'

const NewProduct: FC<path> = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState<Query>({ filters: { is_featured: true } })

  useQuery({
    queryKey: ['home-featured'],
    queryFn: () => publicAxios.get<Product[]>('/product', { params: query }),
    cacheTime: 1000 * 60 * 10,
    onSuccess: (response: Product[]) => {
      setProducts(response)
    }
  })

  return (
    <section className='max-w-7xl mx-auto pt-11 pb-28'>
      <div className='pb-14 text-center'>
        <h3 className='text-3xl text-[#222222] uppercase font-bold'>Sản phẩm đặc sắc</h3>
      </div>
      <ProductSlider products={products} />
    </section>
  )
}

export default NewProduct
