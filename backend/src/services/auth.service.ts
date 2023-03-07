import { Cart } from '@/entities/cart.entity'
import { registerData } from '@/entities/shared/auth.interface'
import { User } from '@/entities/user.entity'
import { EntityManager } from '@mikro-orm/mongodb'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import { UserDTO } from './dto/user.dto'
import { UserService } from './user.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
    private em: EntityManager
  ) { }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username)
    const match = await compare(password, user.password)

    if (!match)
      throw new HttpException({ error: { password: 'Mật khẩu không chính xác' } }, HttpStatus.UNPROCESSABLE_ENTITY)

    if (user && match) {
      const { password, createdAt, updatedAt, ...result } = user
      return result
    }

    return null
  }

  async login(user: any, res: any) {
    try {
      const payload = {
        username: user.username,
        authorities: user.authorities,
        authority: user.authority
      } as UserDTO

      const currentUser = await this.em.findOne(User, { username: user.username })
      const accessToken = await this.generateAccessToken(payload)
      const userCart = await this.em.findOne(Cart, { username: user.username })

      const cartCount = userCart ? userCart.products.reduce((acc, item) => item.quantity + acc, 0) : 0

      if (!currentUser.refreshToken) {
        const refreshToken = await this.generateRefreshToken(payload)
        currentUser.refreshToken = refreshToken
      }

      const isTokenExpired = this.checkExpToken(currentUser.refreshToken)
      if (isTokenExpired) {
        const refreshToken = await this.generateRefreshToken(payload)
        currentUser.refreshToken = refreshToken
      }

      res.cookie(
        'userAuth',
        { isAuthenticated: true, refreshToken: currentUser.refreshToken, ...payload },
        {
          httpOnly: false,
          secure: true,
          path: '/',
          sameSite: 'none'
        }
      )

      await this.em.persistAndFlush(currentUser)
      return { accessToken, isAuthenticated: true, cartCount, ...payload }
    } catch (error) {
      throw error
    }
  }

  async register(dto: registerData) {
    await this.userService.create(dto)
  }

  async logout(request: Request, response: Response) {
    try {
      const { userAuth } = request.cookies
      if (!Boolean(userAuth)) throw new HttpException('Lỗi! không có token', HttpStatus.BAD_GATEWAY)

      response.clearCookie('userAuth', {
        httpOnly: false,
        secure: true,
        path: '/',
        sameSite: 'none'
      })

      throw new HttpException('Đăng xuất thành công', HttpStatus.ACCEPTED)
    } catch (error) {
      throw error
    }
  }

  async refresh(req: Request) {
    try {
      const refreshToken = req.cookies.userAuth.refreshToken

      const payload = this.jwtService.verify(refreshToken, {
        secret: this.config.get<string>('security.authentication.jwt.refresh')
      })

      const accessToken = await this.generateAccessToken({
        username: payload.username,
        authorities: payload.authorities,
        authority: payload.authority
      })
      return { accessToken }
    } catch (error) {
      throw new HttpException('Refresh token hết hạn', HttpStatus.NOT_IMPLEMENTED)
    }
  }

  async generateAccessToken(dto: any) {
    try {
      const accessToken = await this.jwtService.signAsync(dto, {
        secret: this.config.get<string>('security.authentication.jwt.access'),
        expiresIn: '5m'
      })

      return accessToken
    } catch (error) {
      throw error
    }
  }

  async generateRefreshToken(dto: any) {
    try {
      const refreshToken = await this.jwtService.signAsync(dto, {
        secret: this.config.get<string>('security.authentication.jwt.refresh'),
        expiresIn: '7d'
      })

      return refreshToken
    } catch (error) {
      throw error
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const decode = await this.jwtService.verify(token, {
        secret: this.config.get<string>('security.authentication.jwt.access')
      })

      return decode
    } catch (error) {
      throw new HttpException('accesstoken expried', HttpStatus.FORBIDDEN)
    }
  }

  private async checkExpToken(token: string) {
    const date = new Date()
    const decodedToken: any = this.jwtService.decode(token)

    if (decodedToken.exp < date.getTime() / 1000) {
      // expired
      return true
    }

    return false
  }
}
