import { Pageable } from '@/entities/shared/interface'
import { FindOptions, QueryOrder, QueryOrderMap } from '@mikro-orm/core'
import { Builder } from 'builder-pattern'

export const whereCond = <T>(filters: any) => {
  const where = {} as any
  for (const property in filters) {
    if (filters[property] !== 'all') {
      if (['is_featured', 'is_new'].includes(property)) {
        where[property] = filters[property] == 'true' ? true : false
      }

      where[property] = filters[property]
    }
  }

  return where
}

export const makeFindOptions = <T>(pageable: Pageable): FindOptions<T> => {
  let orderBy = Builder<QueryOrderMap<T>>().build()
  if (pageable?.sort) {
    const arr = Object.values(pageable?.sort)
    orderBy[arr[0]] = arr[1] === 'a' ? 1 : -1
  }
  return Builder<FindOptions<T>>()
    .limit(+pageable.maxPage ?? 20)
    .offset((+pageable.page ?? 0) * (+pageable.maxPage ?? 20))
    .orderBy(orderBy)
    .build()
}
