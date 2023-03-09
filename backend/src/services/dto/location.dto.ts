import { Province, District, Ward } from '@/entities/shared/location.interface'

export class ProvinceDTO implements Province {
    ProvinceID: number
    ProvinceName: string
    Code: number
}

export class DistrictDTO implements District {
    DistrictID: number
    ProvinceID: number
    DistrictName: string
    Code: number
}

export class WardDTO implements Ward {
    WardCode: number
    DistrictID: number
    WardName: string
}
