import { z } from 'zod'

const clientEnvSchema = z.object({
  NEXT_PUBLIC_ROOT_URL: z.string(),
  NEXT_PUBLIC_MAPBOX_API_KEY: z.string(),
})
const _env = clientEnvSchema.safeParse({
  NEXT_PUBLIC_ROOT_URL: process.env.NEXT_PUBLIC_ROOT_URL,
  NEXT_PUBLIC_MAPBOX_API_KEY: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
})

if (_env.success === false) {
  console.error('❌ Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = _env.data
