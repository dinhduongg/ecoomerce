import { faFacebookF, faInstagram, faPinterestP, faSnapchat, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import useAuth from '~/hooks/useAuth'

const Info: FC = () => {
  const { auth } = useAuth()
  return (
    <div className='h-[45px] bg-header-info-bg relative flex items-center justify-center'>
      <div className='absolute h-full top-0 left-0 flex items-center pl-10'>
        <a href='#' className='text-lg text-88 p-3 hover:text-[#e65540] duration-300'>
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href='#' className='text-lg text-88 p-3 hover:text-[#e65540] duration-300'>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href='#' className='text-lg text-88 p-3 hover:text-[#e65540] duration-300'>
          <FontAwesomeIcon icon={faPinterestP} />
        </a>
        <a href='#' className='text-lg text-88 p-3 hover:text-[#e65540] duration-300'>
          <FontAwesomeIcon icon={faSnapchat} />
        </a>
        <a href='#' className='text-lg text-88 p-3 hover:text-[#e65540] duration-300'>
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
      <span className='text-88 text-sm'>Free shipping for standard order over $100</span>
      <div className='absolute h-full top-0 right-0 flex items-center pr-10'>
        <span className='text-88 text-sm'>
          Chào mừng: <span className='text-[#e65540] font-bold'>{auth?.username ?? 'Khách'}</span>
        </span>
      </div>
    </div>
  )
}

export default Info
