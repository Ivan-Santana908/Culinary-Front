const DEFAULT_API_BASE_URL = 'https://backend-android-production-55c1.up.railway.app/api'

export function resolveApiBaseUrl(rawUrl?: string): string {
  const value = (rawUrl || DEFAULT_API_BASE_URL).trim().replace(/\/+$/, '')

  if (value.endsWith('/api')) {
    return value
  }

  return `${value}/api`
}
