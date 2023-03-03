import { Cart, ProductCart } from "~/shared/cart.interface"
import { Query } from "~/shared/interface"
import { Product } from "~/shared/product.interface"
import { privateAxios } from "~/utils/axiosClient"

const cartApi = {
    getUserCart: (query: Query): Promise<Cart> => {
        return privateAxios.get('/cart', { params: query })
    },

    addToCart: (dto: Product, query: Query): Promise<Cart> => {
        return privateAxios.post('/cart/create', dto, { params: query })
    },

    removeProduct: (id: string, query: Query): Promise<Cart> => {
        return privateAxios.delete(`/cart/delete/${id}`, { params: query })
    },

    updateQuantity: (obj: any): Promise<Cart> => {
        return privateAxios.patch(`/cart/quantity/${obj.type}`, obj.dto, { params: obj.query })
    }
}

export default cartApi