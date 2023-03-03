import { CartController } from '@/controllers/cart.controller'
import { Cart } from '@/entities/cart.entity'
import { ProductCartMapper } from '@/services/mappers/cart.mapper'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { CartService } from '../services/cart.service'
import { AuthModule } from './auth.module'

@Module({
    imports: [MikroOrmModule.forFeature([Cart]), AuthModule],
    controllers: [CartController],
    providers: [CartService, ProductCartMapper],
    exports: [CartService]
})
export class CartModule { }
