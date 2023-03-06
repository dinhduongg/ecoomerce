import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import cartApi from '~/api/cart.api'
import useAuth from '~/hooks/useAuth'
import useCartCount from '~/hooks/useCartCount'
import { useInvalidateProduct } from '~/hooks/useInvalidateQuery'
import { actions } from '~/reducer/cartCount'
import { Product as IProduct } from '~/shared/product.interface'
import { vietnameseCurrency } from '~/utils/utils'
import Button from '../Button'

interface Props {
  product?: IProduct
}

const Product: FC<Props> = ({ product }) => {
  const { auth } = useAuth()
  const { dispatch } = useCartCount()
  const invalidateProduct = useInvalidateProduct()

  const { mutate } = useMutation({
    mutationFn: (dto: IProduct) => cartApi.addToCart(dto, {})
  })

  const handleAddToCart = (product: IProduct) => {
    mutate(product, {
      onSuccess: () => {
        toast.success('Thêm thành công')
        dispatch(actions.addToCart(1))
        invalidateProduct()
      }
    })
  }

  return (
    <div className='border border-[#e6e5e5]'>
      <div className='relative'>
        <img src={product?.product_image} alt={product?.product_name} />
        <div className='absolute w-full h-full top-0 lef-0 bg-[rgba(0,0,0,0.3)] opacity-0 transition-all duration-300 hover:opacity-100 group overflow-hidden'>
          <div className='absolute right-0 p-4 text-white text-2xl scale-0 group-hover:scale-100'>
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className='absolute left-2/4 -translate-x-2/4 transition-all duration-300 -bottom-5 group-hover:bottom-5 w-full'>
            <Button
              disabled={product?.inUserCart.includes(auth?.username!)}
              primary
              rounded
              custom='mx-auto'
              onClick={() => handleAddToCart(product!)}
            >
              {product?.inUserCart.includes(auth?.username!) ? 'Đã có trong giỏ' : 'Thêm vào giỏ'}
            </Button>
          </div>
        </div>
      </div>
      <div className='p-2'>
        <NavLink to={`/san-pham/${product?.id}`} className='text-text-55 pb-1 duration-200 hover:text-button-hover'>
          {product?.product_name}
        </NavLink>
        <div className='space-x-2 text-text-55'>
          <span>{vietnameseCurrency(product?.discounted_price!)}</span>
          {product?.discounted_price !== product?.standard_price && (
            <span className='line-through text-red-500'>{vietnameseCurrency(product?.standard_price!)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Product
