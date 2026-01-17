import type { AuthContext } from 'better-auth'
import { auth } from '@/lib/auth'

export async function getAuthContext(): Promise<AuthContext> {
  return auth.$context
}
