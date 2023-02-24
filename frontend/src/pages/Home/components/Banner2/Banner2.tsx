import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const Banner2: FC = () => {
  return (
    <section className='py-14 bg-[#f2f2f2] px-4 lg:px-0'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-7 w-full md:w-2/3 lg:w-full mx-auto'>
          <div className='relative overflow-hidden group h-[300px] md:h-[386px] lg:h-[468px]'>
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-20 z-10'></div>
            <img
              src='https://preview.colorlib.com/theme/fashe/images/banner-08.jpg'
              className='group-hover:scale-105 duration-500 transition-all w-full h-full object-cover'
              alt='IMG-BANNER'
            />
            <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full z-20'>
              <span className='font-montserrat text-xl lg:text-3xl tracking-wide font-bold text-white'>The Beauty</span>
              <h3 className='font-montserrat text-4xl lg:text-5xl uppercase tracking-wider font-bold text-white'>
                Lookbook
              </h3>
              <NavLink
                to='/'
                className='pt-5 font-montserrat text-sm uppercase tracking-wide text-white hover:border-b'
              >
                View collection
              </NavLink>
            </div>
          </div>
          <div className='relative h-[300px] md:h-[386px] lg:h-[468px] group overflow-hidden'>
            <img
              src='https://preview.colorlib.com/theme/fashe/images/item-02.jpg'
              className='w-full h-full group-hover:scale-105 duration-500'
              alt='IMG-BANNER'
            />
            <div className='absolute bottom-0 left-0 flex flex-col items-center justify-end w-full bg-white bg-opacity-90'>
              <div className='text-center pt-4'>
                <NavLink to='/' className='block pb-1'>
                  Ten san pham
                </NavLink>
                <span className='pr-1 line-through uppercase font-montserrat text-text-55 text-base'>Gia</span>
                <span className='pr-1 uppercase font-montserrat text-base text-button-hover'>Giam gia</span>
              </div>
              <div className='py-4'>
                <div className='grid grid-cols-4'>
                  <div className='border border-[#dbdbdb] w-14 h-14 flex flex-col items-center justify-center mx-1'>
                    <span className='font-montserrat text-lg text-text-55 leading-4'>69</span>
                    <span className='font-montserrat text-sm text-text-99 leading-5'>days</span>
                  </div>
                  <div className='border border-[#dbdbdb] w-14 h-14 flex flex-col items-center justify-center mx-1'>
                    <span className='font-montserrat text-lg text-text-55 leading-4'>12</span>
                    <span className='font-montserrat text-sm text-text-99 leading-5'>hrs</span>
                  </div>
                  <div className='border border-[#dbdbdb] w-14 h-14 flex flex-col items-center justify-center mx-1'>
                    <span className='font-montserrat text-lg text-text-55 leading-4'>43</span>
                    <span className='font-montserrat text-sm text-text-99 leading-5'>mins</span>
                  </div>
                  <div className='border border-[#dbdbdb] w-14 h-14 flex flex-col items-center justify-center mx-1'>
                    <span className='font-montserrat text-lg text-text-55 leading-4'>43</span>
                    <span className='font-montserrat text-sm text-text-99 leading-5'>secs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner2
