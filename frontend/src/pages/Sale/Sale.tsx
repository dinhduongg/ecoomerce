import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Helmet from '~/components/Helmet'
import Product from '~/components/Product'

import usePublicAxios from '~/hooks/usePublicAxios'
import { Product as IProduct } from '~/shared/product.interface'

const Sale: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const publicAxios = usePublicAxios()
  const { pathname } = useLocation()

  useQuery({
    queryKey: ['product_sale'],
    queryFn: () => publicAxios.get('/product'),
    onSuccess: (response) => {
      setProducts(response.data)
    }
  })

  console.log(products)

  return (
    <Helmet title='Giảm giá'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7'>
        {[1, 2, 3, 3, 434, 3, 43, 4, 3].map((product, index) => {
          return <Product key={index} />
        })}
      </div>
    </Helmet>
  )
}

export default Sale
