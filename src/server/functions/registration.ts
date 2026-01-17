import { createServerFn } from '@tanstack/react-start'
import { challengeConstants } from '@/data/challenge-constants'

export const getRegistrationStatus = createServerFn({ method: 'GET' }).handler(
  async () => {
    const now = new Date()
    const registrationOpenDate = new Date(
      challengeConstants.dates.registrationOpen,
    )
    const registrationCloseDate = new Date(
      challengeConstants.dates.registrationClose,
    )
    const isRegistrationOpen =
      now >= registrationOpenDate && now <= registrationCloseDate
    const isOpened = now >= registrationOpenDate

    return {
      isAvailable: isRegistrationOpen,
      isOpened,
      registrationOpenDate: challengeConstants.dates.registrationOpen,
      registrationCloseDate: challengeConstants.dates.registrationClose,
      now: now.toISOString(),
    }
  },
)
