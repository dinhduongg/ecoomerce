import classNames from 'classnames'
import { motion } from 'framer-motion'
import { cloneElement, FC, useEffect, useState } from 'react'

import Footer from '../components/Footer'
import { LapHeader, MobileHeader } from '../components/Header'
import { Pageable, Query as IQuery } from '~/shared/interface'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { vietnameseCurrency } from '~/utils/utils'
import { useQuery } from '@tanstack/react-query'
import categoryApi from '~/api/category.api'

interface Props {
  children: React.ReactNode | any
}

const initQuery: IQuery = {
  filters: {
    category: 'all'
  },
  pageable: {
    page: 0,
    maxPage: 20,
    sort: {
      field: 'createdAt',
      order: 'a'
    }
  }
}

// const categories = [
//   { key: 'all', value: 'Tất cả' },
//   { key: 'female', value: 'Nữ' },
//   { key: 'male', value: 'Nam' },
//   { key: 'kid', value: 'Trẻ em' },
//   { key: 'accesories', value: 'Phụ kiện' }
// ]

const options = [
  { key: 'createdAt', order: 'd', value: 'Mới nhất' },
  { key: 'discounted_price', order: 'a', value: 'Giá: Thấp đến cao' },
  { key: 'discounted_price', order: 'd', value: 'Giá: Cao đến thấp' }
]

const prices = [
  { from: 0, to: 500000 },
  { from: 500000, to: 1000000 },
  { from: 1000000, to: 1500000 }
]

const ProductLayout: FC<Props> = ({ children }) => {
  const [query, setQuery] = useState(initQuery)
  const navigate = useNavigate()
  const location = useLocation()

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getAllCategory({}),
    staleTime: Infinity
  })

  const sortByPrice = (v: string) => {
    if (v === 'DEFAULT') {
      delete query.filters.from
      delete query.filters.to
    }
    const price = prices[+v]
    setQuery((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...price
      }
    }))
  }

  const sortByOption = (v: string) => {
    if (v === 'DEFAULT') {
      setQuery((prev) => ({
        ...prev,
        ...initQuery
      }))
      return
    }
    const option = options[+v]
    setQuery((prev) => ({
      ...prev,
      filters: {
        ...prev.filters
      },
      pageable: {
        ...prev.pageable,
        sort: {
          field: option.key,
          order: option.order
        }
      } as Pageable
    }))
  }

  useEffect(() => {
    navigate(
      {
        pathname: location.pathname,
        search: `?${createSearchParams({ ...query.filters, ...query.pageable?.sort })}`
      },
      { replace: true }
    )
  }, [query.filters, query.pageable])

  return (
    <div className='overflow-hidden md:overflow-auto font-roboto'>
      <header className='hidden lg:block'>
        <LapHeader />
      </header>
      <header className='lg:hidden'>
        <MobileHeader />
      </header>
      <motion.div
        initial={{ y: '50px', opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.2 } }}
        exit={{ y: '50px', opacity: 0, transition: { duration: 0.2 } }}
      >
        <div className='pt-14 pb-16 max-w-7xl mx-auto px-4 lg:px-0'>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7'>
            <div className='pr-5'>
              <h4 className='font-montserrat text-lg text-[rgb(51, 51, 51)] font-black pb-2'>Thể loại</h4>
              <ul>
                <li
                  className={classNames('cursor-pointer pt-1', {
                    'text-red-500': query.filters.category === 'all'
                  })}
                  onClick={() =>
                    setQuery((prev) => ({
                      ...prev,
                      filters: {
                        ...prev.filters,
                        category: 'all'
                      }
                    }))
                  }
                >
                  Tất cả
                </li>
                {categories?.map((category, index) => {
                  return (
                    <li
                      className={classNames('cursor-pointer pt-1', {
                        'text-red-500': query.filters.category === category.key
                      })}
                      key={index}
                      onClick={() =>
                        setQuery((prev) => ({
                          ...prev,
                          filters: {
                            ...prev.filters,
                            category: category.key
                          }
                        }))
                      }
                    >
                      <span className='font-montserrat'>{category.value}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className='md:col-span-2 lg:col-span-3'>
              <div className='pb-9 flex space-x-3'>
                <select
                  onChange={(e) => sortByOption(e.target.value)}
                  defaultValue={'DEFAULT'}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'
                >
                  <option value='DEFAULT'>Chọn bộ lọc</option>
                  {options.map((option, index) => {
                    return (
                      <option key={index} value={index}>
                        {option.value}
                      </option>
                    )
                  })}
                </select>
                <select
                  onChange={(e) => sortByPrice(e.target.value)}
                  defaultValue={'DEFAULT'}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'
                >
                  <option value='DEFAULT'>Lọc theo giá</option>
                  {prices.map((price, index) => {
                    return (
                      <option key={index} value={index}>
                        {vietnameseCurrency(price.from)} - {vietnameseCurrency(price.to)}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>{cloneElement(children, { query: query })}</div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  )
}

export default ProductLayout
