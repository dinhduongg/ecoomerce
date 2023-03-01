import { Query } from "~/shared/interface"
import { publicAxios } from "~/utils/axiosClient"

const productApi = {
    getAll: (query: Query) => {
        const params = query ? query : {}
        return publicAxios.get('/product', { params: params })
    },

    getOne: (id: string) => {
        return publicAxios.get(`/product/${id}`, { params: {} })
    }
}

export default productApi