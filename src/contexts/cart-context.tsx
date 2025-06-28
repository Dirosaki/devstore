'use client'

import { createContext, PropsWithChildren, use, useState } from 'react'

type CartItem = {
  productId: number
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addToCart: (productId: number) => void
}

export const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: Readonly<PropsWithChildren>) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(productId: number) {
    setCartItems((prev) => {
      const productInCart = prev.some((item) => item.productId === productId)

      if (productInCart) {
        return prev.map((item) => {
          if (item.productId === productId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }

          return item
        })
      }

      return [...prev, { productId, quantity: 1 }]
    })
  }

  return (
    <CartContext value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext>
  )
}

export const useCart = () => use(CartContext)
