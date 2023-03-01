import { FC } from 'react'
import Button from '~/components/Button'

const Banner: FC = () => {
  return (
    <section className='py-10 max-w-7xl mx-auto px-4'>
      <div className='grid grid-grid-cols-1 lg:grid-cols-3 gap-8 w-full md:w-2/3 lg:w-full mx-auto'>
        <div className='space-y-8'>
          <div className='relative overflow-hidden group'>
            <img
              className='w-full transition-all duration-500 group-hover:scale-110'
              src='https://preview.colorlib.com/theme/fashe/images/banner-02.jpg'
              alt='IMG_BANNER'
            />
            <div className='w-2/5 shadow-lg absolute right-2/4 translate-x-2/4 bottom-5'>
              <Button primary full to='/' custom='bg-white !text-button-primary hover:text-white'>
                Dresses
              </Button>
            </div>
          </div>
          <div className='relative overflow-hidden group'>
            <img
              className='w-full transition-all duration-500 group-hover:scale-110'
              src='https://preview.colorlib.com/theme/fashe/images/banner-05.jpg'
              alt='IMG_BANNER'
            />
            <div className='w-2/5 shadow-lg absolute right-2/4 translate-x-2/4 bottom-5'>
              <Button primary full to='/' custom='bg-white !text-button-primary hover:text-white'>
                Sunglasses
              </Button>
            </div>
          </div>
        </div>
        <div className='space-y-8'>
          <div className='relative overflow-hidden group'>
            <img
              className='w-full transition-all duration-500 group-hover:scale-110'
              src='https://preview.colorlib.com/theme/fashe/images/banner-03.jpg'
              alt='IMG_BANNER'
            />
            <div className='w-2/5 shadow-lg absolute right-2/4 translate-x-2/4 bottom-5'>
              <Button primary full to='/' custom='bg-white !text-button-primary hover:text-white'>
                Watches
              </Button>
            </div>
          </div>
          <div className='relative overflow-hidden group'>
            <img
              className='w-full transition-all duration-500 group-hover:scale-110'
              src='https://preview.colorlib.com/theme/fashe/images/banner-07.jpg'
              alt='IMG_BANNER'
            />
            <div className='w-2/5 shadow-lg absolute right-2/4 translate-x-2/4 bottom-5'>
              <Button primary full to='/' custom='bg-white !text-button-primary hover:text-white'>
                Footerwear
              </Button>
            </div>
          </div>
        </div>
        <div className='space-y-8'>
          <div className='relative overflow-hidden group'>
            <img
              className='w-full transition-all duration-500 group-hover:scale-110'
              src='https://preview.colorlib.com/theme/fashe/images/banner-04.jpg'
              alt='IMG_BANNER'
            />
            <div className='w-2/5 shadow-lg absolute right-2/4 translate-x-2/4 bottom-5'>
              <Button primary full to='/' custom='bg-white !text-button-primary hover:text-white'>
                Bags
              </Button>
            </div>
          </div>
          <div className='relative overflow-hidden group'>
            <img
              className='w-full transition-all duration-500 group-hover:scale-110'
              src='https://preview.colorlib.com/theme/fashe/images/icons/bg-01.jpg'
              alt='IMG_BANNER'
            />
            <div className='absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center'>
              <h4 className='w-4/5 text-3xl text-[#111111] uppercase text-center pb-2'>SIGN UP & GET 20% OFF</h4>
              <p className='w-4/5 text-base text-text-88 text-center'>
                Be the frist to know about the latest fashion news and get exclu-sive offers
              </p>
              <div className='w-2/4 pt-6'>
                <Button primary full rounded to='/' custom='py-3'>
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
