import { Module } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryController } from '../controllers/category.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Category } from '@/entities/category.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Category]),],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
