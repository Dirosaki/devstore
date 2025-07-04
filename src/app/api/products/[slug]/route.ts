import { NextRequest } from 'next/server'
import { z } from 'zod/v4'

import data from '../data.json'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = z.string().parse((await params).slug)

  const product = data.products.find((product) => product.slug === slug)

  if (!product) {
    return Response.json(
      {
        message: 'Product not found',
      },
      { status: 400 },
    )
  }

  return Response.json(product)
}
