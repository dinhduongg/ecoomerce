import { createContext, FC, useReducer } from 'react'
import cartCountReducer, { initState } from '~/reducer/cartCount'

type Props = {
  children: React.ReactNode
}

export interface ICartCountContext {
  count: number
  dispatch: React.Dispatch<{ type: string; payload: number }>
}

const CartCountContext = createContext<ICartCountContext>({
  count: 0,
  dispatch: () => {}
})

export const CartCountProvider: FC<Props> = ({ children }) => {
  const [count, dispatch] = useReducer(cartCountReducer, initState)

  return <CartCountContext.Provider value={{ count, dispatch }}>{children}</CartCountContext.Provider>
}

export default CartCountContext
