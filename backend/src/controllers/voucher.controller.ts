import { VoucherDTO } from '@/services/dto/voucher.dto'
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { VoucherService } from '../services/voucher.service'

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post('create')
  create(@Body() dto: VoucherDTO) {
    return this.voucherService.create(dto)
  }

  @Get()
  findAll() {
    return this.voucherService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: VoucherDTO) {
    return this.voucherService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherService.remove(id)
  }
}
