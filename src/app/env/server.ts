import { z } from 'zod'

const serverEnvSchema = z.object({
  NEXT_PUBLIC_ROOT_URL: z.string(),
  NEXT_PUBLIC_MAPBOX_API_KEY: z.string(),
  HOTJAR_ID: z.string(),
})

export async function getEnv() {
  const _env = serverEnvSchema.safeParse(process.env)

  if (_env.success === false) {
    console.error('❌ Invalid environment variables!', _env.error.format())

    throw new Error('Invalid environment variables!')
  }

  return _env.data
}
