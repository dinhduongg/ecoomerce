import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import cartApi from '~/api/cart.api'
import productApi from '~/api/product.api'
import Button from '~/components/Button'
import Helmet from '~/components/Helmet'
import ProductSlider from '~/components/ProductSlider'
import useAuth from '~/hooks/useAuth'
import useCartCount from '~/hooks/useCartCount'
import { useInvalidateProduct } from '~/hooks/useInvalidateQuery'
import { actions } from '~/reducer/cartCount'
import { Query } from '~/shared/interface'
import { Product } from '~/shared/product.interface'
import { vietnameseCurrency } from '~/utils/utils'
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
  const [quantity, setQuantity] = useState(1)
  const [isDesc, setIsDesc] = useState(true)
  const [query, setQuery] = useState<Query>()
  const [product, setProduct] = useState<Product>()
  const [products, setProducts] = useState<Product[]>([])
  const { auth } = useAuth()
  const { dispatch } = useCartCount()
  const invalidateProduct = useInvalidateProduct()

  const { id } = useParams()

  const { isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getOne(id!),
    enabled: id != undefined,
    onSuccess: (response: Product) => {
      setProduct(response)
      setQuery((prev) => ({
        ...prev,
        filters: {
          category: response.category
        }
      }))
    }
  })

  useQuery({
    queryKey: ['product', 'related'],
    queryFn: () => productApi.getAll(query as Query),
    enabled: query?.filters != undefined,
    onSuccess: (response: Product[]) => {
      setProducts(response)
    }
  })

  const { mutate } = useMutation({
    mutationFn: (product: Product) => cartApi.addToCart(product, {})
  })

  const handleAddToCart = () => {
    mutate(product!, {
      onSuccess: () => {
        toast.success('Thêm thành công')
        dispatch(actions.addToCart(1))
        invalidateProduct()
      }
    })
  }

  if (isLoading) {
    return <>is Loading ...</>
  }

  return (
    <Helmet title='Chi tiết sản phẩm'>
      <section className='max-w-6xl mx-auto pt-9 pb-20'>
        <div className='grid grid-cols-2 gap-7'>
          <div>
            <ProductGalley images={product ? product?.product_galley : []} />
          </div>
          <div className='h-fit'>
            <h1 className='text-2xl'>{product?.product_name}</h1>
            <div className='w-8 bg-black h-1 rounded-full my-4'></div>
            <p className='text-primary text-2xl'>{vietnameseCurrency(product?.standard_price!)}</p>
            <div className='py-4'>
              <p className='pb-4 text-[#353535]'>{product?.short_description}</p>
              <div className='pb-2 text-[#353535]'>
                Mã sản phẩm: <strong>{product?.product_code}</strong>
              </div>
              <div className='pb-2 text-[#353535]'>
                Tags: <strong>{JSON.stringify(product?.category)}</strong>
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
              <Button
                disabled={product?.inUserCart.includes(auth?.username!)}
                primary
                custom='w-auto rounded-none py-2'
                onClick={handleAddToCart}
              >
                {product?.inUserCart.includes(auth?.username!) ? 'Đã có trong giỏ' : 'Thêm vào giỏ'}
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
              className={classNames(
                'border-t-2 border-t-button-primary border-r border-l border-[#ddd] -mb-[1px] p-2 cursor-pointer',
                {
                  'bg-white text-[rgba(17,17,17,0.85)]': Boolean(isDesc),
                  'bg-[rgba(0,0,0,0.04)] text-[rgba(102,102,102,0.85)]': !Boolean(isDesc)
                }
              )}
              onClick={() => setIsDesc(true)}
            >
              Mô tả
            </div>
            <div
              className={classNames(
                'border-t-2 border-t-button-primary border-r border-l border-[#ddd] -mb-[1px] text-black p-2 cursor-pointer',
                {
                  'bg-white text-[rgba(17,17,17,0.85)]': !Boolean(isDesc),
                  'bg-[rgba(0,0,0,0.04)] text-[rgba(102,102,102,0.85)]': Boolean(isDesc)
                }
              )}
              onClick={() => setIsDesc(false)}
            >
              Đánh giá
            </div>
          </div>
          {isDesc ? (
            <div className='border border-[#ddd] p-7 text-[#353535]'>
              <span>{product?.description}</span>
            </div>
          ) : (
            <UserReview />
          )}
        </div>

        {/* Related products */}
        {products?.length !== 0 && (
          <div className='py-8 px-4 lg:px-0'>
            <h2 className='text-2xl font-bold'>Sản phẩm tương tự</h2>
            <ProductSlider products={products} />
          </div>
        )}
      </section>
    </Helmet>
  )
}

export default ProductDetail
