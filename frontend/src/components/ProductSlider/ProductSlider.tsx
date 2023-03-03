import React, { FC, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import { Navigation } from 'swiper'
import Button from '../Button'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Product } from '~/shared/product.interface'
import { vietnameseCurrency } from '~/utils/utils'
import { useMutation } from '@tanstack/react-query'
import cartApi from '~/api/cart.api'
import { ProductCart } from '~/shared/cart.interface'
import { toast } from 'react-toastify'

interface Props {
  products: Product[]
}

const ProductSlider: FC<Props> = ({ products }) => {
  const swiperRef: any = useRef()

  const { mutate } = useMutation({
    mutationKey: ['addToCart'],
    mutationFn: (dto: Product) => cartApi.addToCart(dto, {})
  })

  const handleAddToCart = (product: Product) => {
    mutate(product, {
      onSuccess: () => {
        toast.success('Thêm thành công')
      }
    })
  }

  return (
    <div className='relative'>
      <div
        className='bg-button-primary absolute top-2/4 -translate-y-2/4 left-0 lg:-left-12 w-9 h-9 rounded-full border-2 border-button-primary flex items-center justify-center text-white cursor-pointer hover:bg-button-primary lg:hover:bg-white hover:border-button-primary lg:hover:border-button-primary hover:text-white lg:hover:text-button-primary duration-200 z-10'
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        onBeforeInit={(swiper: any) => {
          swiperRef.current = swiper
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 15
          }
        }}
        modules={[Navigation]}
        className=''
      >
        {products.map((product, index) => {
          return (
            <SwiperSlide key={index}>
              <div className='border border-[#e6e5e5] mx-4 lg:mx-0 my-1'>
                <div className='relative'>
                  <img src={product.product_image} alt={product.product_name} />
                  <div className='absolute w-full h-full top-0 lef-0 bg-[rgba(0,0,0,0.3)] opacity-0 transition-all duration-300 hover:opacity-100 group overflow-hidden'>
                    <div className='absolute right-0 p-4 text-white text-2xl scale-0 group-hover:scale-100'>
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div className='absolute left-2/4 -translate-x-2/4 transition-all duration-300 -bottom-5 group-hover:bottom-5 w-full'>
                      <Button primary rounded custom='mx-auto' onClick={() => handleAddToCart(product)}>
                        Thêm vào giỏ
                      </Button>
                    </div>
                  </div>
                </div>
                <div className='p-2'>
                  <NavLink
                    to={`/san-pham/${product.id}`}
                    className='text-text-55 pb-1 duration-200 hover:text-button-hover'
                  >
                    {product.product_name}
                  </NavLink>
                  <div className='space-x-2 text-text-55'>
                    <span>{vietnameseCurrency(product.discounted_price)}</span>
                    {product.discounted_price !== product.standard_price && (
                      <span className='line-through text-red-500'>{vietnameseCurrency(product.standard_price)}</span>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div
        className='bg-button-primary absolute top-2/4 -translate-y-2/4 right-0 lg:-right-12 w-9 h-9 rounded-full border-2 border-button-primary flex items-center justify-center text-white cursor-pointer hover:bg-button-primary lg:hover:bg-white hover:border-button-primary lg:hover:border-button-primary hover:text-white lg:hover:text-button-primary duration-200 z-10'
        onClick={() => swiperRef.current?.slideNext()}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  )
}

export default ProductSlider
