import { Cart } from '@/entities/cart.entity'
import { Category } from '@/entities/category.entity'
import { Favorite } from '@/entities/favorite.entity'
import { Product } from '@/entities/product.entity'
import { Review } from '@/entities/review.entity'
import { AuthorityRole } from '@/entities/shared/enum'
import { Query } from '@/entities/shared/interface'
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

export const generalCategoryTemplate = Builder(Category)
  .key('')
  .value('')
  .createdAt(new Date())
  .updatedAt(new Date())
  .build()

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
  .discounted_price(0)
  .size([''])
  .discount_percent(0)
  .discount_price(0)
  .category([])
  .inUserCart([])
  .is_featured(false)
  .is_new(false)
  .num_review(0)
  .avg_rating(0)
  .build()

export const generalReviewTemplate = Builder(Review).product_id('').user_id('').rating(0).comment('').build()

export const generalCartTemplate = Builder(Cart).username('').products([]).total_money(0).build()

export const generalFavoriteTemplate = Builder(Favorite).username('').products([]).build()
