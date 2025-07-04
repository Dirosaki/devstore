import { env } from './env'

export function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL
  const url = new URL('/api'.concat(path), baseUrl)

  return fetch(url, init)
}
