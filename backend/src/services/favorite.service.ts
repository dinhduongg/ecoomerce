import { Favorite } from '@/entities/favorite.entity';
import { EntityManager, MongoEntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { FavoriteDTO, ProductFavoriteDTO } from './dto/favorite.dto';
import { ProductDTO } from './dto/product.dto';
import { ProductFavoriteMapper } from './mappers/favorite.mapper';
import { cloneDeep } from 'lodash'
import { generalFavoriteTemplate } from './support/dictionary';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Product } from '@/entities/product.entity';

@Injectable()
export class FavoriteService {

  constructor(
    @InjectRepository(Favorite)
    protected readonly repository: MongoEntityRepository<Favorite>,
    protected readonly em: EntityManager,
    protected readonly mapper: ProductFavoriteMapper
  ) { }

  async create(dto: Partial<ProductFavoriteDTO> & Pick<ProductDTO, 'id'>, user: any) {
    try {
      const userFavorite = await this.repository.findOne({ username: user.username })

      const product = this.mapper.toEntity(dto)

      await this.updateInUserFavorite(product.product_id, user, 'add')

      if (!userFavorite) {
        const cart = this.repository.create(cloneDeep(generalFavoriteTemplate))
        cart.username = user.username
        cart.products.push(product)

        await this.repository.persistAndFlush(cart)
        return cart
      }

      const isExist = userFavorite.products.find((item) => item.product_id === product.product_id)
      if (isExist) throw new HttpException('Sản phẩm đã ở trong danh sách yêu thích của bạn', HttpStatus.BAD_REQUEST)

      userFavorite.products.push(product)

      await this.repository.persistAndFlush(userFavorite)
      return userFavorite
    } catch (error) {
      throw error
    }
  }

  async getUserFavorite(user: any): Promise<FavoriteDTO> {
    try {
      const favorite = await this.repository.findOne({ username: user.username })

      if (!favorite) {
        const template = this.repository.create(cloneDeep(generalFavoriteTemplate))
        template.username = user.username
        return template
      }

      return favorite
    } catch (error) {
      throw new HttpException(
        `Có lỗi trong quá trình lấy giỏ hàng của người dùng ${user.username}`,
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async remove(id: string, user: any) {
    try {
      const favorite = await this.getUserFavorite(user)

      const idx = this.findIndex(favorite.products, id)
      favorite.products.splice(idx, 1)
      await this.updateInUserFavorite(id, user, 'delete')

      await this.repository.persistAndFlush(favorite)
      return favorite
    } catch (error) {
      throw error
    }
  }

  private async updateInUserFavorite(id: string, user: any, type: 'add' | 'delete') {
    try {
      const product = await this.em.findOne(Product, { id })

      if (type === 'add') {
        product.inUserFavorite.push(user.username)
      } else {
        product.inUserFavorite = product.inUserFavorite.filter((item) => item !== user.username)
      }

      await this.em.persistAndFlush(product)
      return product
    } catch (error) {
      throw error
    }
  }

  private findIndex(arr: ProductFavoriteDTO[], id: string): number {
    let result = -1
    arr.forEach((item, index) => {
      if (item.product_id === id) {
        result = index
      }
    })
    return result
  }
}
