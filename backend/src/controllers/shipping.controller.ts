import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShippingService } from '@/services/shipping.service';
import { Query } from '@nestjs/common/decorators';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) { }

  @Get('province')
  async getProvince() {
    return this.shippingService.getProvince()
  }

  @Get('district')
  async getDistrict(@Query() dto: any) {
    return this.shippingService.getDistrict(dto)
  }

  @Get('ward')
  async getWard(@Query() dto: any) {
    return this.shippingService.getWard(dto)
  }

  @Post()
  create(@Body() dto: any) {
    return this.shippingService.create(dto);
  }

  @Get()
  findAll() {
    return this.shippingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.shippingService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingService.remove(+id);
  }
}
