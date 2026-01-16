import { Calendar } from 'lucide-react'
import { challengeConstants } from '@/data/challenge-constants'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-white/90">
            📅 Registration Opens: {challengeConstants.dates.registrationOpen}
          </span>
          <span className="text-white/40">|</span>
          <span className="text-sm text-white/90">
            🏆 Final Pitch: {challengeConstants.dates.finalPitch}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          {challengeConstants.headline}
          <br />
          <span className="text-emerald-400">{challengeConstants.name}</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
          {challengeConstants.subheadline}
        </p>

        <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-emerald-500/25">
          Join the Challenge
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
