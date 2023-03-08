import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import cartApi from '~/api/cart.api'
import Button from '~/components/Button'
import useAuth from '~/hooks/useAuth'
import useCartCount from '~/hooks/useCartCount'
import { useInvalidateProduct } from '~/hooks/useInvalidateQuery'
import { actions } from '~/reducer/cartCount'
import { ProductCart } from '~/shared/cart.interface'
import { vietnameseCurrency } from '~/utils/utils'

const CartNav: FC = () => {
  const { auth } = useAuth()
  const { dispatch } = useCartCount()
  const invalidateProduct = useInvalidateProduct()
  const queryClient = useQueryClient()

  const { data: userCart } = useQuery({
    queryKey: ['userCart'],
    queryFn: () => {
      const controller = new AbortController()
      if (Boolean(auth?.isAuthenticated) === false) {
        controller.abort()
      }
      return cartApi.getUserCart({}, controller.signal)
    },
    cacheTime: 1000 * 60 * 10,
    retry: false
  })

  const { mutateAsync: remove } = useMutation({
    mutationFn: (product: ProductCart) => {
      return cartApi.removeProduct(product.product_id, {})
    }
  })

  const handleRevome = (product: ProductCart) => {
    remove(product, {
      onSuccess: () => {
        dispatch(actions.removeFromCart(product.quantity))
        queryClient.invalidateQueries({ queryKey: ['userCart'] })
        invalidateProduct()
      }
    })
  }

  return (
    <>
      {userCart?.products.length !== 0 ? (
        <>
          <ul className='max-h-72 overflow-auto cursor-default'>
            {userCart?.products.map((cart, index) => {
              return (
                <li key={cart.product_id} className='flex flex-wrap items-center py-2'>
                  <div className='relative w-20 mr-5 group'>
                    <img src={cart.product_image} alt={cart.product_name} />
                    <div
                      onClick={() => handleRevome(cart)}
                      className='cursor-pointer absolute flex items-center justify-center h-full w-full top-0 bg-[rgba(0,0,0,0.5)] transition-all duration-300 opacity-0 group-hover:opacity-100'
                    >
                      <FontAwesomeIcon className='text-white text-lg' icon={faXmark} />
                    </div>
                  </div>
                  <div className='w-[calc(100%-100px)]'>
                    <NavLink
                      to={`/san-pham/${cart.product_id}`}
                      className='block text-55 leading-4 mb-3 break-words hover:text-button-hover'
                    >
                      {cart.product_name}
                    </NavLink>
                    <span className='block text-xs text-88 leading-4'>
                      <span>{cart.quantity}</span>
                      <span className='mx-1'>x</span>
                      <span>{vietnameseCurrency(cart.discounted_price)}</span>
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className='leading-3 text-55 text-right pt-4 pb-7'>
            Tổng: <span className='text-button-hover'>{vietnameseCurrency(userCart?.total_money ?? 0)}</span>
          </div>
          <div className='flex flex-wrap justify-between items-center'>
            <Button to='/gio-hang' custom='w-[calc((100%-10px)/2)]' rounded primary>
              Xem giỏ hàng
            </Button>
            <Button to='/thanh-toan' custom='w-[calc((100%-10px)/2)]' rounded primary>
              Thanh toán
            </Button>
          </div>
        </>
      ) : (
        <div className='text-center py-5 text-lg cursor-default'>Giỏ hàng của bạn trống trơn</div>
      )}
    </>
  )
}

export default CartNav
