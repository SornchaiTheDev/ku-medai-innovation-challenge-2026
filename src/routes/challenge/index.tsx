import { createFileRoute } from '@tanstack/react-router'
import { getRegistrationStatus } from '@/server/functions/registration'
import Hero from '@/components/challenge/Hero'
import About from '@/components/challenge/About'
import Tracks from '@/components/challenge/Tracks'
import Prizes from '@/components/challenge/Prizes'
import Timeline from '@/components/challenge/Timeline'
import Eligibility from '@/components/challenge/Eligibility'
import Footer from '@/components/challenge/Footer'

export const Route = createFileRoute('/challenge/')({
  component: RouteComponent,
  loader: async () => {
    try {
      const data = await getRegistrationStatus()
      return {
        isAvailable: data.isAvailable,
        isOpened: data.isOpened,
        isClosed:
          !data.isAvailable &&
          new Date(data.now) > new Date(data.registrationCloseDate),
        isLoading: false,
      }
    } catch (error) {
      console.error('Failed to check registration status:', error)
      return {
        isAvailable: false,
        isOpened: false,
        isClosed: false,
        isLoading: false,
      }
    }
  },
})

function RouteComponent() {
  const registrationStatus = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-white">
      <Hero registrationStatus={registrationStatus} />
      <About />
      <Tracks />
      <Prizes />
      <Timeline />
      <Eligibility />
      <Footer />
    </div>
  )
}
