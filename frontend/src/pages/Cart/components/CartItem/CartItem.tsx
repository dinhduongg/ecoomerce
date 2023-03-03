import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { FC, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import cartApi from '~/api/cart.api'
import { ProductCart } from '~/shared/cart.interface'
import { vietnameseCurrency } from '~/utils/utils'

interface Props {
  cart: ProductCart
  loading: any
}

const CartItem: FC<Props> = ({ cart, loading }) => {
  const { mutateAsync: updateQty, isLoading } = useMutation({
    mutationFn: (obj: any) => {
      return cartApi.updateQuantity(obj)
    }
  })

  const { mutateAsync: remove, isLoading: rLoading } = useMutation({
    mutationFn: (id: string) => {
      return cartApi.removeProduct(id, {})
    }
  })

  const handleQuantity = (type: 'increase' | 'decrease') => {
    const obj = {
      type,
      dto: cart,
      query: {}
    }
    updateQty(obj)
  }

  const handleRemoveCart = (id: string) => {
    remove(id, {
      onSuccess: () => {
        toast.success('Bỏ sản phẩm ra khỏi giỏ hàng thành công')
      }
    })
  }

  useEffect(() => {
    loading(isLoading)
    loading(rLoading)
  }, [isLoading, rLoading])

  return (
    <>
      <div className='text-start space-x-2 flex items-center'>
        <NavLink to={`/san-pham/${cart.product_id}`} className='block w-16 h-16 lg:w-20 lg:h-20 overflow-hidden'>
          <img className='w-full h-full' src={cart.product_image} />
        </NavLink>
        <div>
          <NavLink to={`/san-pham/${cart.product_id}`} className='text-xs lg:text-base hover:text-button-hover'>
            {cart.product_name}
          </NavLink>
          <p className='block lg:hidden'>
            <span>{cart.quantity}</span>
            <span className='space-x-1'>*</span>
            <span>{vietnameseCurrency(cart.discounted_price)}</span>
          </p>
        </div>
      </div>
      <p className='hidden lg:flex items-center text-start text-2xl'>
        <span className='text-lg font-extrabold'>{vietnameseCurrency(cart.discounted_price)}</span>
      </p>
      <div className='justify-end lg:justify-start'>
        <button
          disabled={isLoading || cart.quantity == 1}
          className='py-2 px-3 border border-[#353535] cursor-pointer '
          onClick={() => handleQuantity('decrease')}
        >
          -
        </button>
        <span
          className={classNames('py-2 px-5 border-t border-b border-t-[#353535] border-b-[#353535]', {
            disabled: isLoading
          })}
        >
          {cart.quantity}
        </span>
        <button
          disabled={isLoading}
          className='py-2 px-3 border border-[#353535] cursor-pointer'
          onClick={() => handleQuantity('increase')}
        >
          +
        </button>
      </div>
      <p className='hidden lg:flex items-center text-start text-2xl'>
        <span className='text-lg font-extrabold'>{vietnameseCurrency(cart.total_price)}</span>
      </p>
      <div>
        <div
          className={classNames('cursor-pointer hover:opacity-60 duration-150 h-fit', {
            disabled: rLoading
          })}
          onClick={() => handleRemoveCart(cart.product_id)}
        >
          <FontAwesomeIcon className='text-lg' icon={faXmarkCircle} />
        </div>
      </div>
    </>
  )
}

export default CartItem
