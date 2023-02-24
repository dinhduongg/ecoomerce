import { FC } from 'react'

const Banner: FC = () => {
  return (
    <div
      className='w-full min-h-[240px] px-4 bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center'
      style={{
        backgroundImage: `url("https://preview.colorlib.com/theme/fashe/images/heading-pages-06.jpg")`
      }}
    >
      <h2 className='font-montserrat text-[50px] text-white uppercase font-bold'>Liên hệ</h2>
    </div>
  )
}

export default Banner
