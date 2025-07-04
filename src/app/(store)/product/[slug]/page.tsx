import { Metadata } from 'next'
import Image from 'next/image'

import { AddToCartButton } from '@/components/add-to-cart-button'
import { api } from '@/config/api'
import { getProduct } from '@/services/get-product'
import { Product } from '@/types/product'

type ProductProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const { title } = await getProduct((await params).slug)

  return {
    title,
  }
}

export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: Product[] = await response.json()

  return products.map(({ slug }) => ({ slug }))
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct((await params).slug)

  return (
    <div className="flex-1 relative grid max-h-[calc(100vh-(44px+32px+24px+32px))] grid-cols-3 overflow-hidden">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt=""
          width={860}
          height={860}
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block px-5 py-2.5 font-semibold rounded-full bg-violet-500">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x s/ juros de&nbsp;
            {(product.price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              GG
            </button>
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}
