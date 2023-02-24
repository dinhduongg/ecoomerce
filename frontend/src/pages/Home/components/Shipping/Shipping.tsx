import { FC } from 'react'

const Shipping: FC = () => {
  return (
    <section className='mx-auto pb-12 pt-16'>
      <div className='grid grid-cols-1 md:grid-cols-3 px-4'>
        <div className='text-center p-4'>
          <h4 className='font-montserrat text-lg text-text-55'>Free Delivery Worldwide</h4>
          <span className='text-base text-text-88'>Click here for more info</span>
        </div>
        <div className='text-center border-t border-b md:border-t-0 md:border-b-0 md:border-x md:border-x-[#ccc] p-4'>
          <h4 className='font-montserrat text-lg text-text-55'>30 Days Return</h4>
          <span className='text-base text-text-88'>Simply return it within 30 days for an exchange</span>
        </div>
        <div className='text-center p-4'>
          <h4 className='font-montserrat text-lg text-text-55'>Store Opening</h4>
          <span className='text-base text-text-88'>Shop open from Monday to Sunday</span>
        </div>
      </div>
    </section>
  )
}

export default Shipping
