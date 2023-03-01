import { useQuery } from '@tanstack/react-query'
import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Helmet from '~/components/Helmet'
import Product from '~/components/Product'
import usePublicAxios from '~/hooks/usePublicAxios'
import { Query as IQuery } from '~/shared/interface'

interface Props {
  query: IQuery
}

const Shop: FC<Props> = ({ query }) => {
  const publicAxios = usePublicAxios()
  const { pathname } = useLocation()

  const {
    data: products,
    refetch,
    isLoading
  } = useQuery({
    queryKey: ['products', query.filters.mainSide],
    queryFn: () => publicAxios.get('/product', { params: query })
  })

  useEffect(() => {
    refetch()
  }, [query])

  if (isLoading) {
    return <>loading ...</>
  }

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
