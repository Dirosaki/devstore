'use client'

import { ShoppingBagIcon } from 'lucide-react'

import { useCart } from '@/contexts/cart-context'

export function CartWidget() {
  const { items } = useCart()

  return (
    <div className="flex items-center gap-2">
      <ShoppingBagIcon className="size-4" />
      <span className="text-sm">Cart ({items.length})</span>
    </div>
  )
}
