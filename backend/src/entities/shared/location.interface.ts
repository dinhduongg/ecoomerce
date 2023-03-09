export interface Province {
    ProvinceID: number
    ProvinceName: string
    Code: number
}

export interface District {
    DistrictID: number
    ProvinceID: number
    DistrictName: string
    Code: number
}

export interface Ward {
    WardCode: number
    DistrictID: number
    WardName: string
}