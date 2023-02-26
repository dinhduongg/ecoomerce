import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { FC, useRef, useState } from 'react'
import { Navigation, Thumbs, type Swiper as SwiperRef } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// const images = [
//   'https://preview.colorlib.com/theme/fashe/images/thumb-item-01.jpg',
//   'https://preview.colorlib.com/theme/fashe/images/thumb-item-02.jpg',
//   'https://preview.colorlib.com/theme/fashe/images/thumb-item-03.jpg',
//   'https://preview.colorlib.com/theme/fashe/images/banner-02.jpg.webp'
// ]

interface Props {
  images: string[]
}

const ProductGalley: FC<Props> = ({ images }) => {
  const swiperRef = useRef<SwiperRef>()
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperRef>()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        onBeforeInit={(swiper: any) => {
          swiperRef.current = swiper
        }}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        onRealIndexChange={(element) => setActiveIndex(element.realIndex)}
        className='relative'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className='pt-[100%] overflow-hidden relative'>
            <img src={image} className='absolute top-0 left-0 w-full object-cover' alt='product-image' />
          </SwiperSlide>
        ))}
        <div className='hidden lg:flex items-center justify-between absolute top-2/4 left-0 -translate-y-2/4 z-[1000] w-full px-1 duration-300'>
          <div
            className='bg-black w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white cursor-pointer duration-200'
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div
            className='bg-black w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white cursor-pointer duration-200'
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </Swiper>
      <div className='mt-2'></div>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
        className='relative'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className='cursor-pointer'>
            {({ isActive }) => (
              <div
                className={classNames('border w-full pt-[100%] overflow-hidden relative', {
                  'border-text-88 opacity-50': index !== activeIndex,
                  'border-button-primary opacity-100': index === activeIndex
                })}
              >
                <img src={image} className='absolute top-0 left-0 w-full' alt='product-image' />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default ProductGalley
