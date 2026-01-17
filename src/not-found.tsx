import { Link } from '@tanstack/react-router'
import { Home } from 'lucide-react'
import FadeContent from '@/components/FadeContent'
import AnimatedContent from '@/components/AnimatedContent'
import StarBorder from '@/components/StarBorder'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <FadeContent duration={800} blur>
          <div className="mb-8">
            <span className="text-9xl font-bold text-white/10">404</span>
          </div>
        </FadeContent>

        <FadeContent duration={800} delay={200} blur>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h1>
        </FadeContent>

        <FadeContent duration={800} delay={400} blur>
          <p className="text-lg md:text-xl text-slate-400 max-w-md mx-auto mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </FadeContent>

        <AnimatedContent
          distance={20}
          duration={0.6}
          delay={600}
          ease="back.out(1.2)"
        >
          <StarBorder
            as={Link}
            to="/"
            color="#50d8af"
            speed="4s"
            thickness={2}
            variant="emerald"
            className="text-lg"
          >
            <Home size={20} className="inline mr-2" />
            Back to Home
          </StarBorder>
        </AnimatedContent>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/85 to-transparent" />
    </div>
  )
}
