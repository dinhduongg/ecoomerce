import { FC } from 'react'
import ProductSlider from '~/components/ProductSlider'

const NewProduct: FC = () => {
  const products: any = [1, 2, 3, 4, 5]

  return (
    <section className='max-w-7xl mx-auto pt-11 pb-28'>
      <div className='pb-14 text-center'>
        <h3 className='text-3xl text-[#222222] uppercase font-bold'>Sản phẩm đặc sắc</h3>
      </div>
      <ProductSlider products={products} />
    </section>
  )
}

export default NewProduct
