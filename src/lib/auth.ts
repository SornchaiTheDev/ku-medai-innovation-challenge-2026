import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { env } from '@/env'
import { db } from '@/lib/db'
import * as authSchema from '@/lib/db/schema/auth-schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema,
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [tanstackStartCookies()],
  advanced: {
    cookiePrefix: 'ku-medai',
  },
})
