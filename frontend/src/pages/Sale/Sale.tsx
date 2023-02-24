import { FC } from 'react'
import Helmet from '~/components/Helmet'
import Product from '~/components/Product'

const Sale: FC = () => {
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
