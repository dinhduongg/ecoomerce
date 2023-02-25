import { JwtAuthGuard, Roles, RolesGuard } from '@/authentication'
import { AuthorityRole } from '@/entities/shared/enum'
import { Query as IQuery } from '@/entities/shared/interface'
import { ProductDTO } from '@/services/dto/product.dto'
import { Body, Controller, Delete, Get, Param, Patch, UseGuards, Post } from '@nestjs/common'
import { Query } from '@nestjs/common/decorators'
import { query } from 'express'
import { ProductService } from '../services/product.service'
import { Source } from './support/source.decorator'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  create(@Body() dto: ProductDTO) {
    return this.productService.create(dto)
  }

  @Get()
  findAll(@Source() source: string, @Query() query: IQuery) {
    return this.productService.findAll(source, query)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Source() source: string) {
    return this.productService.findOne(id, source)
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Source() source: string, @Body() dto: ProductDTO) {
    return this.productService.update(id, source, dto)
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id)
  }
}
