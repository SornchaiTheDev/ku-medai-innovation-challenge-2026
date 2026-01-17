import { auth } from '@/lib/auth'
import { AuthContext } from 'better-auth'

export async function getAuthContext(): Promise<AuthContext> {
  return auth.$context
}
