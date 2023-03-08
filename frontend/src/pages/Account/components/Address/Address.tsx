import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import Button from '~/components/Button'

const Address: FC = () => {
  return (
    <div>
      <div className='px-7 py-6 border-b flex items-center justify-between'>
        <h3>Địa chỉ của tôi</h3>
        <Button primary>
          <FontAwesomeIcon icon={faPlus} />
          <span className='ml-2'>Thêm địa chỉ mới</span>
        </Button>
      </div>
    </div>
  )
}

export default Address
