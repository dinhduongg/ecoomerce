import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const Blog: FC = () => {
  return (
    <section className='pt-24 pb-16'>
      <div className='max-w-7xl mx-auto'>
        <div className='pb-12'>
          <h3 className='font-montserrat text-3xl uppercase text-text-22 font-bold text-center'>Blog</h3>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 px-4'>
          {[1, 2, 3].map((blog, index) => {
            return (
              <div key={index} className='border border-text-[#ddd]'>
                <NavLink to='/' className='block group overflow-hidden'>
                  <img
                    src='https://preview.colorlib.com/theme/fashe/images/blog-01.jpg'
                    className='group-hover:scale-105 duration-500 w-full block'
                  />
                </NavLink>
                <div className='p-4'>
                  <h4 className='pb-2 line-clamp-2'>Black Friday Guide: Best Sales & Discount Codes</h4>
                  <span className='text-text-99 text-xs'>By </span>
                  <span className='text-text-55 text-sm'>Duong </span>
                  <span className='text-text-99 text-xs'>on </span>
                  <span className='text-text-55 text-sm'>ngay-thang-nam</span>
                  <p className='font-montserrat text-sm text-text-88 leading-6 pt-4 line-clamp-3'>
                    Duis ut velit gravida nibh bibendum commodo. Sus-pendisse pellentesque mattis augue id euismod.
                    Inter-dum et malesuada fames Duis ut velit gravida nibh bibendum commodo. Sus-pendisse pellentesque
                    mattis augue id euismod. Inter-dum et malesuada fames
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Blog
