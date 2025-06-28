import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'

import { env } from '@/config/env'
import { getProduct } from '@/services/get-product'

export const alt = 'Product Open Graph Image'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OgImage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  const productImageURL = new URL(
    product.image,
    env.NEXT_PUBLIC_BASE_URL,
  ).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL} alt="" style={{ width: '100%' }} />
      </div>
    ),
    size,
  )
}
