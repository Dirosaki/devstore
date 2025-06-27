import Image from 'next/image'
import Link from 'next/link'

import { api } from '@/config/api'
import { Product } from '@/types/product'

async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60 * 24, // 1 day
    },
  })

  return response.json()
}

export default async function Home() {
  const [highlightedProduct, ...products] = await getFeaturedProducts()

  return (
    <div className="flex-1 grid max-h-[calc(100vh-(44px+32px+24px+32px))] grid-cols-9 grid-rows-6 gap-6 overflow-hidden">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-center"
      >
        <Image
          src={highlightedProduct.image}
          alt=""
          width={920}
          height={920}
          quality={100}
          objectFit="contain"
          className="group-hover:scale-105 transition-transform duration-500 size-full object-contain"
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-center"
        >
          <Image
            src={product.image}
            alt=""
            width={460}
            height={460}
            quality={100}
            className="group-hover:scale-105 transition-transform duration-500 size-full object-contain"
          />

          <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{product.title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
