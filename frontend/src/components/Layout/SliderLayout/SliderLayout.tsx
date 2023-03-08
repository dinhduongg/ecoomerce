import { FC } from 'react'
import { motion } from 'framer-motion'

import Footer from '../components/Footer'
import { LapHeader, MobileHeader } from '../components/Header'
import Slider from '../components/Slider'

interface Props {
  children: React.ReactNode
}

const SliderLayout: FC<Props> = ({ children }) => {
  return (
    <div className='overflow-hidden md:overflow-auto font-roboto'>
      <header className='hidden lg:block'>
        <LapHeader />
      </header>
      <header className='lg:hidden'>
        <MobileHeader />
      </header>
      {/* <motion.div
        initial={{ y: '150px', opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
        exit={{ y: '50px', opacity: 0, transition: { duration: 0.2 } }}
      > */}
      <div className='h-[370px] lg:h-[570px]'>
        <Slider />
      </div>
      {children}
      {/* </motion.div> */}
      <Footer />
    </div>
  )
}

export default SliderLayout
