import { Query } from '~/shared/interface'
import { Product } from '~/shared/product.interface'
import { publicAxios } from '~/utils/axiosClient'

const productApi = {
  getAll: (query: Query): Promise<Product[]> => {
    const params = query ? query : {}
    return publicAxios.get('/product', { params: params })
  },

  getOne: (id: string): Promise<Product> => {
    return publicAxios.get(`/product/${id}`, { params: {} })
  }
}

export default productApi
