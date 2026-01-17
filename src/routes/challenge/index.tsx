import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
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

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800/50 to-emerald-900/20" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
          <div className="relative w-16 h-16">
            <svg
              className="w-full h-full animate-spin text-emerald-500"
              viewBox="0 0 50 50"
            >
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="30 90"
                className="opacity-30"
              />
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="30 90"
                strokeDashoffset="-60"
                className="opacity-80"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

function RouteComponent() {
  const registrationStatus = Route.useLoaderData()
  const [isAnimatingReady, setIsAnimatingReady] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        setIsAnimatingReady(true)
      }, 100)
      return () => clearTimeout(timer)
    }
    setIsAnimatingReady(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {!isAnimatingReady && <LoadingOverlay />}
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
