import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, SetStateAction, useState } from 'react'
import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import reviewApi from '~/api/review.api'
import Button from '~/components/Button'
import Rating from '~/pages/ProductDetail/components/Rating'
import { Review as IReview } from '~/shared/review.interface'
import Comment from '../Comment'

const UserReview: FC = () => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [type, setType] = useState('add')

  const { id } = useParams()

  const { data: reviews, refetch } = useQuery({
    queryKey: ['product_review', id],
    queryFn: () => reviewApi.getProductReview(id!, {}),
    staleTime: 60 * 1000,
    enabled: id !== undefined
  })

  const { mutate: addReview } = useMutation({
    mutationFn: (body: Pick<IReview, 'rating' | 'comment'>) => {
      return reviewApi.createReview(id!, body, {})
    }
  })

  const { mutate: updateReview } = useMutation({
    mutationFn: (body: Pick<IReview, 'rating' | 'comment'>) => {
      return reviewApi.updateReview(id!, body, {})
    }
  })

  const handleReview = () => {
    if (rating === 0) {
      toast.error('Bạn chưa nhập sao')
    } else if (!comment) {
      toast.error('Bạn chưa nhập đánh giá')
    } else {
      const review = {
        rating: rating,
        comment: comment
      }

      if (type === 'add') {
        addReview(review, {
          onSuccess: () => {
            setRating(0)
            setComment('')
            toast.success('Thêm bình luận thành công')
          },
          onError: (error: any) => {
            toast.error(error.response?.data?.message)
          }
        })
      } else {
        updateReview(review, {
          onSuccess: () => {
            setRating(0)
            setComment('')
            setType('add')
            refetch()
            toast.success('Cập nhật bình luận thành công')
          },
          onError: (error: any) => {
            toast.error(error.response?.data?.message)
          }
        })
      }
    }

    return
  }

  const handleData = (data: IReview) => {
    if (data) {
      setRating(data.rating)
      setComment(data.comment)
      setType('update')
    }
    return
  }

  return (
    <div className='border border-[#ddd] p-7 text-[#353535]'>
      {reviews && reviews.length !== 0 ? (
        reviews.map((item: IReview) => {
          return <Comment key={item.id} review={item} handleData={handleData} />
        })
      ) : (
        <div>
          <h3 className='text-xl text-[#1c1c1c] mb-2 font-bold'>Đánh giá</h3>
          <h2 className='text-base text-[#353535] mb-5 pb-7'>Chưa có đánh giá nào</h2>
        </div>
      )}
      <div className='border-2 border-button-primary p-6'>
        {/* <h3 className='text-xl text-[#1c1c1c] mb-2 font-bold'>Hãy là người đầu tiên nhận xét :name</h3> */}
        <p className='text-base text-[#353535]'>Đánh giá của bạn</p>
        <div className='space-x-0 md:space-x-4 flex flex-col items-start md:flex-row md:items-center text-[#ddd] mb-2'>
          <Rating
            rating={rating}
            onRating={(rate: SetStateAction<number>) => setRating(rate === rating ? 0 : rate)}
            isEdit
          />
        </div>
        <div>
          <h2 className='text-[#1c1c1c] mb-2 font-bold'>Nhận xét của bạn *</h2>
          <textarea
            className='p-2 w-full outline-none border border-[#ddd] mb-4'
            rows={4}
            value={comment}
            onChange={(e) => setComment(() => e.target.value)}
          />
          <Button primary custom='w-auto' onClick={handleReview}>
            {type === 'add' ? 'Gửi đi' : 'Cập nhật'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserReview
