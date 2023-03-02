import { FC } from 'react'
import { Review } from '~/shared/review.interface'
import Rating from '../Rating'
import useAuth from '~/hooks/useAuth'

interface Props {
  review: Review
  handleData: any
}

const Comment: FC<Props> = ({ review, handleData }) => {
  const { auth } = useAuth()
  return (
    <div key={review.id}>
      <div className='flex items-baseline space-x-2'>
        <h3 className='text-xl text-[#1c1c1c] font-bold'>{review.user_id}</h3>
        {auth?.username === review.user_id && (
          <span className='cursor-pointer hover:underline hover:text-primary' onClick={() => handleData(review)}>
            Chỉnh sửa
          </span>
        )}
      </div>
      <h2 className='text-base text-[#353535]'>
        <Rating rating={review.rating} />
      </h2>
      <div className='mb-5 flex items-center space-x-4'>
        <h2 className='text-base text-[#353535]'>{review.comment}</h2>
      </div>
    </div>
  )
}

export default Comment
