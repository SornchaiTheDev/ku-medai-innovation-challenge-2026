import { Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'
import { challengeConstants } from '@/data/challenge-constants'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeUntil(targetDate: string): TimeLeft {
  const target = new Date(targetDate).getTime()
  const now = new Date().getTime()
  const difference = target - now

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeUntil(targetDate),
  )
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeUntil(targetDate)
      setTimeLeft(newTimeLeft)
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsExpired(true)
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (isExpired) {
    return null
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="flex justify-center gap-4 mb-8">
      {timeUnits.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 min-w-[70px] border border-white/20">
            <div className="text-2xl font-bold text-white">
              {String(unit.value).padStart(2, '0')}
            </div>
          </div>
          <div className="text-xs text-white/60 mt-1">{unit.label}</div>
        </div>
      ))}
    </div>
  )
}

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

        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-6">
          {challengeConstants.subheadline}
        </p>

        <CountdownTimer targetDate="January 26, 2026" />

        <div>
          <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-emerald-500/25">
            Join the Challenge
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
