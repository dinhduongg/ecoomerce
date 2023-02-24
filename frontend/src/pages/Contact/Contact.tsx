import { FC } from 'react'
import Helmet from '~/components/Helmet'
import Banner from './components/Banner'
import Content from './components/Content'

const Contact: FC = () => {
  return (
    <Helmet title='Liên hệ'>
      <section>
        <Banner />
        <Content />
      </section>
    </Helmet>
  )
}

export default Contact
