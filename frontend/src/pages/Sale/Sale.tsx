import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import productApi from '~/api/product.api'
import Helmet from '~/components/Helmet'
import Product from '~/components/Product'

import { Query } from '~/shared/interface'
import { Product as IProduct } from '~/shared/product.interface'

interface Props {
  query: Query
}

const Sale: FC<Props> = ({ query }) => {
  const [products, setProducts] = useState<IProduct[]>([])

  const { refetch } = useQuery({
    queryKey: ['product', 'sale'],
    queryFn: () => productApi.getAll(query),
    onSuccess: (response) => {
      setProducts(response)
    }
  })

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <Helmet title='Giảm giá'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7'>
        {products.map((product, index) => {
          return <Product product={product} key={index} />
        })}
      </div>
    </Helmet>
  )
}

export default Sale
