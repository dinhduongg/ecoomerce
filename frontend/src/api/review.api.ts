import { Query } from '~/shared/interface'
import { Review } from '~/shared/review.interface'
import { privateAxios, publicAxios } from '~/utils/axiosClient'

const reviewApi = {
  getProductReview: (productId: string, params: Query): Promise<Review[]> => {
    return publicAxios.get(`/review/${productId}`, { params: params })
  },

  createReview: (productId: string, data: Pick<Review, 'rating' | 'comment'>, params: Query) => {
    return privateAxios.post(`/review/create/${productId}`, data, { params: params })
  },

  updateReview: (productId: string, data: Pick<Review, 'rating' | 'comment'>, params: Query) => {
    return privateAxios.patch(`/review/update/${productId}`, data, { params: params })
  }
}

export default reviewApi
