import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
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

  const products = useQuery({
    queryKey: ['products', query.filters.mainSide],
    queryFn: () => publicAxios.get('/products', { params: { ...query } })
  })

  console.log(products.data)

  return (
    <Helmet title='Shop'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7'>
        {[1, 2, 3, 3, 434, 3, 43, 4, 3].map((product, index) => {
          return <Product key={index} />
        })}
      </div>
    </Helmet>
  )
}

export default Shop
