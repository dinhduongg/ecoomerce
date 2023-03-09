import { Injectable } from '@nestjs/common'
import { Builder } from 'builder-pattern'
import { ProvinceDTO, DistrictDTO, WardDTO } from '../dto/location.dto'

@Injectable()
export class LocationMapper {
    toProvinceDTO(source: ProvinceDTO): ProvinceDTO {
        return Builder(ProvinceDTO)
            .ProvinceID(source.ProvinceID)
            .ProvinceName(source.ProvinceName)
            .Code(source.Code)
            .build()
    }

    toDistrictDTO(source: DistrictDTO): DistrictDTO {
        return Builder(DistrictDTO)
            .ProvinceID(source.ProvinceID)
            .DistrictID(source.DistrictID)
            .DistrictName(source.DistrictName)
            .Code(source.Code)
            .build()
    }

    toWardDTO(source: WardDTO): WardDTO {
        return Builder(WardDTO)
            .DistrictID(source.DistrictID)
            .WardCode(source.WardCode)
            .WardName(source.WardName)
            .build()
    }
}
