'use client'

import { createAuthClient } from 'better-auth/client'
import { Chrome } from 'lucide-react'
import StarBorder from '@/components/StarBorder'

const authClient = createAuthClient()

export function AuthButton() {
  return (
    <StarBorder
      as="button"
      color="#34d399"
      speed="4s"
      thickness={2}
      variant="emerald"
      className="font-semibold text-lg cursor-pointer"
      onClick={() =>
        authClient.signIn.social({
          provider: 'google',
          callbackURL: '/challenge/register',
        })
      }
    >
      <div className="flex items-center gap-2">
        <Chrome className="h-5 w-5" />
        Continue with Google
      </div>
    </StarBorder>
  )
}
