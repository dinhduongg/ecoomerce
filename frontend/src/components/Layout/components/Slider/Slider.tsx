import { FC, useRef } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import './styles.css'

// import required modules
import classNames from 'classnames'
import { EffectFade, Navigation, Autoplay } from 'swiper'
import Button from '~/components/Button'

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Slider: FC = () => {
  const swiperRef: any = useRef()
  const slides = [
    {
      img: 'https://preview.colorlib.com/theme/fashe/images/master-slide-01.jpg',
      alt: 'SLIDE_1',
      spanAnimate: 'animate-fadeInDown',
      h2Animate: 'animate-fadeInUp',
      buttonAnimate: 'animate-zoomIn'
    },
    {
      img: 'https://preview.colorlib.com/theme/fashe/images/master-slide-03.jpg',
      alt: 'SLIDE_2',
      spanAnimate: 'animate-rollIn',
      h2Animate: 'animate-lightSpeedIn',
      buttonAnimate: 'animate-slideInUp'
    },
    {
      img: 'https://preview.colorlib.com/theme/fashe/images/master-slide-02.jpg',
      alt: 'SLIDE_2',
      spanAnimate: 'animate-fadeInDown',
      h2Animate: 'animate-fadeInUp',
      buttonAnimate: 'animate-zoomIn'
    },
    {
      img: 'https://preview.colorlib.com/theme/fashe/images/master-slide-04.jpg',
      alt: 'SLIDE_2',
      spanAnimate: 'animate-rotateInDownLeft',
      h2Animate: 'animate-rotateInUpRight',
      buttonAnimate: 'animate-rotateIn'
    }
  ]

  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={false}
        pagination={{
          clickable: true
        }}
        onBeforeInit={(swiper: any) => {
          swiperRef.current = swiper
        }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false
        }}
        loop={true}
        modules={[EffectFade, Navigation, Autoplay]}
        className='w-full h-full relative group'
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index} className='bg-center bg-cover'>
              {({ isActive }) => (
                <div className='relative h-full'>
                  <img className='block w-full h-full object-cover' src={slide.img} alt={slide.alt} />
                  <div className='absolute top-2/4 -translate-y-2/4 right-0 left-0 w-full text-center'>
                    <span
                      className={classNames(
                        'block font-montserrat text-base lg:text-lg text-white tracking-widest mb-4 invisible',
                        {
                          [`${slide.spanAnimate} !visible`]: isActive
                        }
                      )}
                    >
                      Women collection 2022
                    </span>
                    <h2
                      className={classNames(
                        'uppercase font-montserrat font-bold text-[40px] text-6xl text-white tracking-wide mb-9 invisible',
                        {
                          [`${slide.h2Animate} !visible`]: isActive
                        }
                      )}
                    >
                      New Arrivals
                    </h2>
                    <div
                      className={classNames('w-[160px] mx-auto invisible', {
                        [`${slide.buttonAnimate} !visible`]: isActive
                      })}
                    >
                      <Button to='/' primary rounded custom='block bg-white text-black px-8 py-3 hover:text-white '>
                        Shop now
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          )
        })}
        <div className='hidden lg:flex items-center justify-between absolute top-2/4 -translate-y-2/4 z-[1000] w-full px-10 duration-300 opacity-0 group-hover:opacity-100'>
          <div
            className='bg-black w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-button-primary duration-200'
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div
            className='bg-black w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white cursor-pointer hover:bg-white hover:text-button-primary duration-200'
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </Swiper>
    </>
  )
}

export default Slider
