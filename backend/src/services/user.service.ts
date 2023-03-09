import { User } from '@/entities/user.entity'
import { UserDTO } from '@/services/dto/user.dto'
import userMapper, { UserMapper } from '@/services/mappers/user.mapper'
import { EntityManager, MongoEntityRepository } from '@mikro-orm/mongodb'
import { InjectRepository } from '@mikro-orm/nestjs'
import { cloneDeep } from 'lodash'
import { hash } from 'bcrypt'
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { generalUserTemplate } from './support/dictionary'
import { HttpException } from '@nestjs/common/exceptions'
import { HttpStatus } from '@nestjs/common/enums'
import { wrap } from '@mikro-orm/core'
import { registerData } from '@/entities/shared/auth.interface'
import { Address } from '@/entities/shared/account.interface'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly repository: MongoEntityRepository<User>,
    protected readonly em: EntityManager,
    // protected eventEmitter: EventEmitter2,
    protected readonly mapper: UserMapper,
    @Inject(CACHE_MANAGER)
    protected readonly _cache: Cache
  ) { }

  async findAll(): Promise<UserDTO[]> {
    try {
      const users = await this.repository.find({})
      return users.map((user) => this.mapper.toDTO(user))
    } catch (error) {
      throw error
    }
  }

  async findOne(username: string): Promise<UserDTO> {
    try {
      const user = await this.repository.findOne({ username: username })
      if (!user)
        throw new HttpException(
          { error: { username: `Tài khoản ${username} không tồn tại` } },
          HttpStatus.UNPROCESSABLE_ENTITY
        )
      return this.mapper.toDTO(user)
    } catch (error) {
      throw error
    }
  }

  async create(dto: registerData): Promise<UserDTO | any> {
    try {
      if (dto.password !== dto.confirmPassword)
        throw new HttpException({ error: { confirmPassword: 'Mật khẩu không khớp' } }, HttpStatus.UNPROCESSABLE_ENTITY)

      const checkUser = await this.repository.findOne({ username: dto.username })
      if (checkUser)
        throw new HttpException({ error: { username: 'Tên đăng nhập đã tồn tại' } }, HttpStatus.UNPROCESSABLE_ENTITY)

      const user = this.repository.create(cloneDeep(generalUserTemplate))
      user.username = dto.username
      user.password = await hash(dto.password, 10)

      await this.repository.persistAndFlush(user)
      return this.mapper.toDTO(user)
    } catch (error) {
      throw error
    }
  }

  async update(username: string, dto: Partial<UserDTO> & { address: Address }): Promise<UserDTO> {
    try {
      const user = await this.repository.findOne({ username: username })
      if (!user) throw new HttpException(`Không tìm thấy người dùng ${username}`, HttpStatus.BAD_REQUEST)

      if (dto.address) {
        dto.addresses = [...user.addresses, dto.address].sort((a, b) => +b.isMain - +a.isMain)
      }
      // user.fullname = dto.fullname ?? user.fullname
      // user.email = dto.email ?? user.email
      // user.phone = dto.phone ?? user.phone
      // user.gender = dto.gender ?? user.gender
      // user.birthday = dto.birthday ?? user.birthday
      // user.addresses = [...user.addresses, dto.address].sort((a, b) => +b.isMain - +a.isMain) ?? user.addresses

      wrap(user).assign(dto)

      await this.repository.flush()
      return userMapper.e2d(user)
    } catch (error) {
      throw error
    }
  }

  async resetPassword(username: string, action: string, dto: Pick<UserDTO, 'password'>): Promise<UserDTO> {
    try {
      const user = await this.repository.findOne({ username })
      if (!user) throw new HttpException(`Không tìm thấy người dùng ${username}`, HttpStatus.BAD_REQUEST)

      if (action === 'change') {
        user.password = await hash(dto.password, 10)
      }

      if (action === 'reset') {
        // reset
        user.password = await hash(user.username, 10)
      }

      await this.repository.persistAndFlush(user)
      return this.mapper.toDTO(user)
    } catch (error) {
      throw error
    }
  }

  async remove(username: string) {
    try {
      return await this.repository.nativeDelete({ username })
    } catch (error) {
      throw error
    }
  }
}
