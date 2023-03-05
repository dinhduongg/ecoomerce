import { Cart } from '@/entities/cart.entity'
import { EntityManager, MongoEntityRepository } from '@mikro-orm/mongodb'
import { InjectRepository } from '@mikro-orm/nestjs'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { cloneDeep } from 'lodash'
import { CartDTO, ProductCartDTO } from './dto/cart.dto'
import { ProductDTO } from './dto/product.dto'
import { ProductCartMapper } from './mappers/cart.mapper'
import { generalCartTemplate } from './support/dictionary'

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    protected readonly repository: MongoEntityRepository<Cart>,
    protected readonly em: EntityManager,
    protected readonly mapper: ProductCartMapper
  ) {}

  async create(dto: Partial<ProductCartDTO> & Pick<ProductDTO, 'id'>, user: any) {
    try {
      const userCart = await this.repository.findOne({ username: user.username })
      const product = this.mapper.toEntity(dto)

      product.total_price = product.quantity * product.discounted_price

      if (!userCart) {
        const cart = this.repository.create(cloneDeep(generalCartTemplate))
        cart.username = user.username
        cart.products.push(product)
        cart.total_money = cart.products.reduce((acc, item) => item.total_price + acc, 0)

        await this.repository.persistAndFlush(cart)
        return cart
      }

      const isExist = userCart.products.find((item) => item.product_id === product.product_id)
      if (isExist) throw new HttpException('Sản phẩm đã ở trong giỏ hàng của bạn', HttpStatus.BAD_REQUEST)

      userCart.products.push(product)
      userCart.total_money = userCart.products.reduce((acc, item) => item.total_price + acc, 0)

      await this.repository.persistAndFlush(userCart)
      return userCart
    } catch (error) {
      throw error
    }
  }

  async getUserCart(user: any): Promise<CartDTO> {
    try {
      const cart = await this.repository.findOne({ username: user.username })

      if (!cart) {
        const template = this.repository.create(cloneDeep(generalCartTemplate))
        template.username = user.username
        return template
      }

      return cart
    } catch (error) {
      throw new HttpException(
        `Có lỗi trong quá trình lấy giỏ hàng của người dùng ${user.username}`,
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async updateQuantity(type: 'increase' | 'decrease', dto: ProductCartDTO, req: any) {
    try {
      const cart = await this.getUserCart(req)
      if (type == 'increase') {
        cart.products.map((cart) => {
          if (cart.product_id === dto.product_id) {
            cart.quantity += 1
            cart.total_price = cart.discounted_price * cart.quantity
          }
          return cart
        })

        this.repository.persist(cart)
      } else {
        cart.products.map((cart) => {
          if (cart.product_id === dto.product_id) {
            cart.quantity = cart.quantity === 1 ? 1 : cart.quantity - 1
            cart.total_price = cart.discounted_price * cart.quantity
          }
          return cart
        })

        this.repository.persist(cart)
      }

      await this.repository.flush()
      return cart
    } catch (error) {
      throw new HttpException(`Có lỗi trong quá trình cập nhật số lượng`, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string, user: any): Promise<CartDTO> {
    try {
      const cart = await this.getUserCart(user)
      const idx = this.findIndex(cart.products, id)
      cart.products.splice(idx, 1)
      cart.total_money = cart.products.reduce((acc, item) => item.total_price + acc, 0)

      await this.repository.persistAndFlush(cart)
      return cart
    } catch (error) {
      throw new HttpException('Có lỗi trong quá trình xóa sản phẩm khỏi giỏ hàng', HttpStatus.BAD_REQUEST)
    }
  }

  private findIndex(arr: ProductCartDTO[], id: string): number {
    let result = -1
    arr.forEach((item, index) => {
      if (item.product_id === id) {
        result = index
      }
    })
    return result
  }
}
