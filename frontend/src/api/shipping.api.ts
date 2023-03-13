import { Query } from "~/shared/interface"
import { District, Province, Ward } from "~/shared/location.interface"
import { publicAxios } from "~/utils/axiosClient"

const shippingApi = {
    getProvince: (query: Query): Promise<Province[]> => {
        return publicAxios.get('/shipping/province', { params: query })
    },

    getDistrict: (dto: any): Promise<District[]> => {
        return publicAxios.get('/shipping/district', { params: dto })
    },

    getWard: (dto: any): Promise<Ward[]> => {
        return publicAxios.get('/shipping/ward', { params: dto })
    }
}

export default shippingApi