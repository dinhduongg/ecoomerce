import { Query } from '@/entities/shared/interface';
import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { DistrictDTO, ProvinceDTO, WardDTO } from './dto/location.dto';
import { LocationMapper } from './mappers/location.mapper';

@Injectable()
export class ShippingService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly mapper: LocationMapper
  ) { }

  async getProvince(query: Query) {
    const { search } = query

    const token = this.config.get('ghn.jwt')
    const url = this.config.get<string>('ghn.location.province')
    const { data } = await firstValueFrom(
      this.httpService.get(url.toString(), {
        headers: {
          Token: token
        }
      }).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ))

    const newData = data.data.filter((item: ProvinceDTO) => item.ProvinceName?.toLowerCase().includes(search?.toLowerCase()))

    return newData.map((item: ProvinceDTO) => this.mapper.toProvinceDTO(item))
  }

  async getDistrict(dto: any) {
    const token = this.config.get('ghn.jwt')
    const url = this.config.get<string>('ghn.location.district')
    const { data } = await firstValueFrom(
      this.httpService.post(url.toString(),
        { province_id: Number(dto.province_id) },
        {
          params: {
            province_id: dto.province_id
          },
          headers: {
            Token: token
          }
        }).pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ))

    const newData = data.data.filter((item: DistrictDTO) => item.DistrictName?.toLowerCase().includes(dto.search?.toLowerCase()))

    return newData.map((item: DistrictDTO) => this.mapper.toDistrictDTO(item))
  }

  async getWard(dto: any) {
    const token = this.config.get('ghn.jwt')
    const url = this.config.get<string>('ghn.location.ward')

    const { data } = await firstValueFrom(
      this.httpService.post(url.toString(),
        { district_id: Number(dto.district_id) },
        {
          headers: {
            Token: token
          },
          // params: {
          //   district_id: Number(dto.district_id)
          // }
        }).pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ))

    const newData = dto.search ? data.data.filter((item: WardDTO) => item.WardName?.toLowerCase().includes(dto.search?.toLowerCase())) : data.data.map((item: WardDTO) => this.mapper.toWardDTO(item))

    return newData
  }

  create(createLocationDto: any) {
    return 'This action adds a new location';
  }

  findAll() {
    return `This action returns all location`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: any) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
