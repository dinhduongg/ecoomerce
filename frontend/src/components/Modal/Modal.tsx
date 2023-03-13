import { FC } from 'react'
import Button from '../Button'
import { motion } from 'framer-motion'

interface Props {
  children?: React.ReactNode
  title: string
  handleCloseModal: any
  handleSubmit: any
}

const Modal: FC<Props> = ({ children, title, handleCloseModal, handleSubmit }) => {
  const closeModal = () => {
    handleCloseModal(false)
  }

  const onSubmit = () => {
    handleSubmit(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className='fixed top-0 left-0 right-0 z-20 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full bg-[rgba(0,0,0,0.4)]'
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
        className='flex items-center justify-center max-w-2xl mx-auto h-full'
      >
        {/* <div className='flex items-center justify-center max-w-2xl mx-auto h-full'> */}
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{title}</h3>
            <button
              onClick={closeModal}
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
            >
              <svg
                aria-hidden='true'
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          <div className='p-6 space-y-6'>{children}</div>
          <div className='flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
            <Button outline onClick={closeModal}>
              Trở lại
            </Button>
            <Button primary onClick={onSubmit}>
              Hoàn thành
            </Button>
          </div>
        </div>
        {/* </div> */}
      </motion.div>
    </motion.div>
  )
}

export default Modal
