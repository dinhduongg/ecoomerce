import { toast } from 'react-toastify'
import { ADD_TO_CART, REMOVE_FROM_CART, SET_CART_COUNT } from './constants'

const initState = Number(localStorage.getItem('cartCount'))

const cartCountReducer = (state: number, action: { type: string; payload: number }) => {
  let totalCartCount = 0

  switch (action.type) {
    case ADD_TO_CART:
      totalCartCount = state + action.payload
      localStorage.setItem('cartCount', totalCartCount.toString())
      return totalCartCount
    case REMOVE_FROM_CART:
      totalCartCount = state - action.payload
      localStorage.setItem('cartCount', totalCartCount.toString())
      return totalCartCount
    case SET_CART_COUNT:
      totalCartCount = action.payload
      return totalCartCount
    default:
      toast.error('Có lỗi trong quá trình lấy giỏ hàng')
      return 0
  }
}

export { initState }
export default cartCountReducer
