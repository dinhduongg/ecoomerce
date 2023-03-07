import { Favorite } from "~/shared/favorite.interface"
import { Query } from "~/shared/interface"
import { Product } from "~/shared/product.interface"
import { privateAxios } from "~/utils/axiosClient"

const favoriteApi = {
    getUserFavorite: (query: Query, signal?: AbortSignal): Promise<Favorite> => {
        return privateAxios.get('/favorite', { params: query })
    },

    addFavorite: (dto: Product, query: Query): Promise<Favorite> => {
        return privateAxios.post('/favorite/create', dto, { params: query })
    },

    removeFavorite: (id: string, query: Query): Promise<Favorite> => {
        return privateAxios.delete(`/favorite/delete/${id}`, { params: query })
    }
}

export default favoriteApi