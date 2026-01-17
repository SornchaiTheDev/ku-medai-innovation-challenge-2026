'use client'

import { createAuthClient } from 'better-auth/client'
import { Chrome } from 'lucide-react'

const authClient = createAuthClient()

export function AuthButton() {
  return (
    <button
      onClick={() =>
        authClient.signIn.social({
          provider: 'google',
          callbackURL: '/challenge/register',
        })
      }
      className="w-full gap-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
    >
      <Chrome className="h-5 w-5" />
      Continue with Google
    </button>
  )
}
