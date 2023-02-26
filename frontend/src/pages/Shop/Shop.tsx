import { useQuery } from '@tanstack/react-query'
import { FC, useEffect } from 'react'
import Helmet from '~/components/Helmet'
import Product from '~/components/Product'
import { Query as IQuery } from '~/shared/interface'
import usePrivateAxios from '~/hooks/usePrivateAxios'
import usePublicAxios from '~/hooks/usePublicAxios'

interface Props {
  query: IQuery
}

const Shop: FC<Props> = ({ query }) => {
  const privateAxios = usePrivateAxios()
  const publicAxios = usePublicAxios()

  const { data: products, refetch } = useQuery({
    queryKey: ['products', query.filters.mainSide],
    queryFn: () => publicAxios.get('/product', { params: query })
  })

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <Helmet title='Shop'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7'>
        {products?.data.map((product: any, index: number) => {
          return <Product product={product} key={index} />
        })}
      </div>
    </Helmet>
  )
}

export default Shop
