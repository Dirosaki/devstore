import { api } from '@/config/api'
import { Product } from '@/types/product'

export async function getProduct(slug: string): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  return response.json()
}
