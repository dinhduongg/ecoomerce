import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AnimationRoutes from './components/AnimationRoutes'
import Loading from './components/Loading'

const App: FC = () => {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()
  return (
    <Router>
      <div className='App'>
        {isFetching + isMutating !== 0 && <Loading />}
        <ToastContainer className='z-[99999999]' />
        <AnimationRoutes />
      </div>
    </Router>
  )
}

export default App
