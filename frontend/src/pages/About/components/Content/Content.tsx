import { FC } from 'react'

const Content: FC = () => {
  return (
    <div className='max-w-6xl mx-auto px-4 lg:px-0 py-16'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-7'>
        <div className='col-span-1'>
          <div className='group overflow-hidden'>
            <img
              src='https://preview.colorlib.com/theme/fashe/images/banner-14.jpg'
              className='object-cover group-hover:scale-105 duration-500'
            />
          </div>
        </div>
        <div className='col-span-2'>
          <h3 className='font-montserrat text-2xl text-text-22 py-4'>Our story</h3>
          <p className='pb-7 text-text-55 text-base leading-7'>
            Phasellus egestas nisi nisi, lobortis ultricies risus semper nec. Vestibulum pharetra ac ante ut
            pellentesque. Curabitur fringilla dolor quis lorem accumsan, vitae molestie urna dapibus. Pellentesque porta
            est ac neque bibendum viverra. Vivamus lobortis magna ut interdum laoreet. Donec gravida lorem elit, quis
            condimentum ex semper sit amet. Fusce eget ligula magna. Aliquam aliquam imperdiet sodales. Ut fringilla
            turpis in vehicula vehicula. Pellentesque congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis
            lectus a arcu facilisis, eu sodales lectus sagittis. Etiam pellentesque, magna vel dictum rutrum, neque
            justo eleifend elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo efficitur, quam velit
            convallis ipsum, et maximus enim ligula ac ligula. Vivamus tristique vulputate ultricies. Sed vitae ultrices
            orci.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Content
