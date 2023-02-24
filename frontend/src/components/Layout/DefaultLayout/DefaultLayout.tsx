import { FC } from 'react'
import { motion } from 'framer-motion'

import Footer from '../components/Footer'
import { LapHeader, MobileHeader } from '../components/Header'

interface Props {
  children: React.ReactNode
}

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div className='overflow-hidden md:overflow-auto font-roboto'>
      <header className='hidden lg:block'>
        <LapHeader />
      </header>
      <header className='lg:hidden'>
        <MobileHeader />
      </header>
      <motion.div
        initial={{ y: '50px', opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.2 } }}
        exit={{ y: '50px', opacity: 0, transition: { duration: 0.2 } }}
      >
        {children}
      </motion.div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
