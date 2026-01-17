import { createFileRoute } from '@tanstack/react-router'
import { challengeConstants } from '@/data/challenge-constants'

export const Route = createFileRoute('/api/registration/status')({
  server: {
    handlers: {
      GET: async () => {
        const now = new Date()
        const registrationOpenDate = new Date(
          challengeConstants.dates.registrationOpen,
        )
        const registrationCloseDate = new Date(
          challengeConstants.dates.registrationClose,
        )
        const isRegistrationOpen =
          now >= registrationOpenDate && now <= registrationCloseDate

        return Response.json({
          isAvailable: isRegistrationOpen,
          registrationOpenDate: challengeConstants.dates.registrationOpen,
          registrationCloseDate: challengeConstants.dates.registrationClose,
          now: now.toISOString(),
        })
      },
    },
  },
})
