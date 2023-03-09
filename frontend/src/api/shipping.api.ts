import { Query } from "~/shared/interface"
import { publicAxios } from "~/utils/axiosClient"

const shippingApi = {
    getProvince: (query: Query) => {
        return publicAxios.get('/shipping/province', { params: query })
    },

    getDistrict: (dto: any) => {
        return publicAxios.get('/shipping/district', { params: dto })
    },

    getWard: (dto: any) => {
        return publicAxios.get('/shipping/ward', { params: dto })
    }
}

export default shippingApi