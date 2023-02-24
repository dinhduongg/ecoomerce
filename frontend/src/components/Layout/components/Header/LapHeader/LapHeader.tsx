import { FC } from 'react'
import Info from './components/Info'
import Navigation from './components/Navigation'

const LapHeader: FC = () => {
  return (
    <div className='shadow-lg-header h-[125px]'>
      <Info />
      <Navigation />
    </div>
  )
}

export default LapHeader
