import { ADD_TO_CART, REMOVE_FROM_CART, SET_CART_COUNT } from './constants'

export const addToCart = (payload: number) => ({
  type: ADD_TO_CART,
  payload
})

export const removeFromCart = (payload: number) => ({
  type: REMOVE_FROM_CART,
  payload
})

export const setCartCount = (payload: number) => ({
  type: SET_CART_COUNT,
  payload
})
