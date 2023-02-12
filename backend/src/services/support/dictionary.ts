import { Category } from '@/entities/category.entity'
import { Product } from '@/entities/product.entity'
import { AuthorityRole } from '@/entities/shared/enum'
import { User } from '@/entities/user.entity'
import { Builder } from 'builder-pattern'

export const generalUserTemplate = Builder(User)
  .username('')
  .password('')
  .email('')
  .phone('')
  .fullname('')
  .authorities([AuthorityRole.USER, AuthorityRole.ANONYMOUS])
  .authority(AuthorityRole.USER)
  .addresses([])
  .refreshToken('')
  .createdAt(new Date())
  .updatedAt(new Date())
  .build()

export const generalCategoryTemplate = Builder(Category).name('').createdAt(new Date()).updatedAt(new Date()).build()

export const generalProductTemplate = Builder(Product)
  .id('')
  .product_code('')
  .product_name('')
  .product_image('')
  .product_galley([])
  .short_description('')
  .description('')
  .in_warehouse(0)
  .standard_price(0)
  .size([''])
  .discount(0)
  .category([])
  .is_featured(false)
  .is_new(false)
  .num_review(0)
  .avg_rating(0)
  .build()
