import { FC } from 'react'
import Helmet from '~/components/Helmet'
import Banner from './components/Banner'
import Content from './components/Content'

const About: FC = () => {
  return (
    <Helmet title='Giới thiệu'>
      <section>
        <Banner />
        <Content />
      </section>
    </Helmet>
  )
}

export default About
