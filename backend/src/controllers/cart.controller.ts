import { TokenVerifyGuard } from '@/authentication/guards/token-verify.guard'
import { ProductCartDTO } from '@/services/dto/cart.dto'
import { ProductDTO } from '@/services/dto/product.dto'
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { CartService } from '../services/cart.service'

@Controller('cart')
@UseGuards(TokenVerifyGuard)
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post('create')
    create(@Body() dto: Partial<ProductCartDTO> & Pick<ProductDTO, 'id'>, @Req() req: any) {
        return this.cartService.create(dto, req.user)
    }

    @Get()
    getUserCart(@Req() req) {
        return this.cartService.getUserCart(req.user)
    }

    @Patch('quantity/:type')
    updateQuantity(@Param('type') type: 'increase' | 'decrease', @Body() dto: ProductCartDTO, @Req() req: any) {
        return this.cartService.updateQuantity(type, dto, req.user)
    }

    @Delete('delete/:id')
    remove(@Param('id') id: string, @Req() req: any) {
        return this.cartService.remove(id, req.user)
    }
}
