import { Category } from '~/shared/category.interface'
import { Query } from '~/shared/interface'
import { publicAxios } from '~/utils/axiosClient'

const categoryApi = {
  getAllCategory: (query: Query): Promise<Category[]> => {
    return publicAxios.get('/category', { params: query })
  }
}

export default categoryApi
