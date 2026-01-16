import { createFileRoute } from '@tanstack/react-router'
import Hero from '@/components/challenge/Hero'
import About from '@/components/challenge/About'
import Tracks from '@/components/challenge/Tracks'
import Prizes from '@/components/challenge/Prizes'
import Timeline from '@/components/challenge/Timeline'
import Eligibility from '@/components/challenge/Eligibility'
import Footer from '@/components/challenge/Footer'

export const Route = createFileRoute('/challenge/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <Tracks />
      <Prizes />
      <Timeline />
      <Eligibility />
      <Footer />
    </div>
  )
}
