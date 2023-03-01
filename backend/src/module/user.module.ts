import { User } from '@/entities/user.entity'
import { AuthService } from '@/services/auth.service'
import { UserMapper } from '@/services/mappers/user.mapper'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserController } from '../controllers/user.controller'
import { UserService } from '../services/user.service'

@Module({
  imports: [MikroOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [UserController],
  providers: [AuthService, UserService, UserMapper],
  exports: [UserService]
})
export class UserModule {}
