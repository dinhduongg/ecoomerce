import { FC } from 'react'
import Helmet from '~/components/Helmet'
import { path } from '~/types/commom'
import Banner from './components/Banner'
import Banner2 from './components/Banner2'
import Blog from './components/Blog'
import NewProduct from './components/NewProduct'
import Shipping from './components/Shipping'

const Home: FC<path> = ({ path }) => {
  return (
    <Helmet title='Trang chủ'>
      <div>
        <Banner />
        <NewProduct path={path} />
        <Banner2 />
        <Blog />
        <Shipping />
      </div>
    </Helmet>
  )
}

export default Home
