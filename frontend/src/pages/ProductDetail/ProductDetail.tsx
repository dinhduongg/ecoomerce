import { FC, useState } from 'react'
import Button from '~/components/Button'
import ProductSlider from '~/components/ProductSlider'
import ProductGalley from './components/ProductGalley'
import UserReview from './components/UserReview'

const ship = [
  'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2018/10/logo-ghn.jpg',
  'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2018/10/logo-ghtk.jpg',
  'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2018/10/logo-ninja-van.jpg',
  'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2018/10/logo-shipchung.jpg',
  'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2018/10/logo-viettle-post.jpg',
  'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2018/10/logo-vn-post.jpg'
]

const payment = [
  'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2018/10/logo-acb.jpg',
  'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2018/10/logo-techcombank.jpg',
  'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2018/10/logo-vib.jpg',
  'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2018/10/logo-vcb.jpg',
  'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2018/10/logo-paypal.jpg',
  'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2018/10/logo-mastercard.jpg'
]

const ProductDetail: FC = () => {
  const [quantity, setQuantity] = useState(0)
  const [isDesc, setIsDesc] = useState(true)

  const products: any = [1, 2, 3, 4, 5]

  return (
    <section className='max-w-6xl mx-auto pt-9 pb-20'>
      <div className='grid grid-cols-2 gap-7'>
        <div>
          <ProductGalley />
        </div>
        <div className='h-fit'>
          <h1 className='text-2xl'>product.title</h1>
          <div className='w-8 bg-black h-1 rounded-full my-4'></div>
          <p className='text-primary text-2xl'>vietnameseCurrency(product.price)</p>
          <div className='py-4'>
            <p className='pb-4 text-[#353535]'>product.description</p>
            <div className='pb-2 text-[#353535]'>
              Thương hiệu: <strong>product.brand</strong>
            </div>
            <div className='pb-2 text-[#353535]'>
              Tags: <strong>product.mainSide === 'male' ? 'Nam' : 'Nữ'</strong>
            </div>
          </div>
          <div className='flex items-center mb-5'>
            <div className='mr-2'>
              <span
                className='py-2 px-3 border border-[#353535] cursor-pointer hover:bg-[#ddd]'
                onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}
              >
                -
              </span>
              <span className='py-2 px-5 border-t border-b border-t-[#353535] border-b-[#353535]'>{quantity}</span>
              <span
                className='py-2 px-3 border border-[#353535] cursor-pointer hover:bg-[#ddd]'
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </span>
            </div>
            <Button primary custom='w-auto rounded-none py-2'>
              Thêm vào giỏ
            </Button>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <div>
              <h2 className='text-base text-[#353535] font-bold'>Tính phí ship tự động</h2>
              <div className='grid grid-cols-3 gap-3'>
                {ship.map((item, index) => {
                  return <img key={index} src={item} alt='anh' />
                })}
              </div>
            </div>
            <div>
              <h2 className='text-base text-[#353535] font-bold'>Thanh toán</h2>
              <div className='grid grid-cols-3 gap-3'>
                {payment.map((item, index) => {
                  return <img key={index} src={item} alt='anh' />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* rating + description */}
      <div className='py-8 px-4 mt-8 lg:px-0 border-t border-b border-t-[#ddd] border-b-[#ddd]'>
        <div className='flex items-center space-x-1'>
          <div
            className={`border-t-2 border-t-button-primary border-r border-l border-[#ddd] -mb-[1px] p-2 cursor-pointer ${
              isDesc ? 'bg-white text-[rgba(17,17,17,0.85)]' : 'bg-[rgba(0,0,0,0.04)] text-[rgba(102,102,102,0.85)]'
            }`}
            onClick={() => setIsDesc(true)}
          >
            Mô tả
          </div>
          <div
            className={`border-t-2 border-t-button-primary border-r border-l border-[#ddd] -mb-[1px] bg-white text-black p-2 cursor-pointer ${
              !isDesc ? 'bg-white text-[rgba(17,17,17,0.85)]' : 'bg-[rgba(0,0,0,0.04)] text-[rgba(102,102,102,0.85)]'
            }`}
            onClick={() => setIsDesc(false)}
          >
            Đánh giá
          </div>
        </div>
        {isDesc ? (
          <div className='border border-[#ddd] p-7 text-[#353535]'>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor.
              Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi,
              vulputate adipiscing cursus eu, suscipit id nulla.
              <br />
              <br />
            </span>
            <span>
              Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget
              velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate,
              sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio
              quis mi. Cras neque metus, consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in
              imperdiet ligula euismod eget.
            </span>
          </div>
        ) : (
          <UserReview />
        )}
      </div>

      {/* Related products */}
      <div className='py-8 px-4 lg:px-0'>
        <h2 className='text-2xl font-bold'>Sản phẩm tương tự</h2>
        <ProductSlider products={products} />
      </div>
    </section>
  )
}

export default ProductDetail
