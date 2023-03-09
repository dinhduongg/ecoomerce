import { User } from "~/shared/account.interface"
import { Query } from "~/shared/interface"
import { profileForm } from "~/types/commom"
import { privateAxios } from "~/utils/axiosClient"


const userApi = {
    getInfo: (): Promise<User> => {
        return privateAxios.get('/users/info')
    },

    updateUser: (dto: profileForm): Promise<User> => {
        return privateAxios.patch('/users/update', dto)
    }
}

export default userApi