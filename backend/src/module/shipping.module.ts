import { Module } from '@nestjs/common';
import { ShippingService } from '../services/shipping.service';
import { ShippingController } from '@/controllers/shipping.controller';
import { HttpModule } from '@nestjs/axios';
import { LocationMapper } from '@/services/mappers/location.mapper';

@Module({
  imports: [HttpModule],
  controllers: [ShippingController],
  providers: [ShippingService, LocationMapper]
})
export class ShippingModule { }
