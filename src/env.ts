import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

function getEnv() {
  if (typeof process !== 'undefined' && process.env) {
    return process.env
  }
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env
  }
  return {}
}

export const env = createEnv({
  server: {
    SERVER_URL: z.string().url().optional(),
    DATABASE_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  },

  clientPrefix: 'VITE_',

  client: {
    VITE_APP_TITLE: z.string().min(1).optional(),
    VITE_BETTER_AUTH_URL: z.string().url(),
  },

  runtimeEnv: getEnv(),

  emptyStringAsUndefined: true,
})
