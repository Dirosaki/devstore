import { z } from 'zod/v4'

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    z.treeifyError(parsedEnv.error).errors,
  )

  throw new Error('Invalid environment variables.')
}

export const env = parsedEnv.data
