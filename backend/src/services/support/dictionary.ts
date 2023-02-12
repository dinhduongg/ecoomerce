import { AuthorityRole } from '@/entities/shared/enum'
import { User } from '@/entities/user.entity'
import { Category } from '@/entities/category.entity'
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
