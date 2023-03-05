import { useContext } from 'react'
import CartCountContext from '~/context/CartCountProvider'

const useCartCount = () => {
  return useContext(CartCountContext)
}

export default useCartCount
