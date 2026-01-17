import { Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'
import { challengeConstants } from '@/data/challenge-constants'
import AnimatedContent from '@/components/AnimatedContent'
import BlurText from '@/components/BlurText'
import FadeContent from '@/components/FadeContent'
import StarBorder from '@/components/StarBorder'
import TextType from '@/components/TextType'
import { cn } from '@/lib/utils'

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
    <div className="flex justify-center gap-4 mb-12">
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
  const [registrationStatus, setRegistrationStatus] = useState<{
    isAvailable: boolean
    isClosed: boolean
    isLoading: boolean
  }>({ isAvailable: false, isClosed: false, isLoading: true })

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const response = await fetch('/api/registration/status')
        const data = await response.json()
        setRegistrationStatus({
          isAvailable: data.isAvailable,
          isClosed:
            !data.isAvailable &&
            new Date(data.now) > new Date(data.registrationCloseDate),
          isLoading: false,
        })
      } catch (error) {
        console.error('Failed to check registration status:', error)
        setRegistrationStatus({
          isAvailable: false,
          isClosed: false,
          isLoading: false,
        })
      }
    }

    checkRegistrationStatus()
  }, [])

  const handleJoinChallenge = () => {
    window.location.href = '/challenge/register'
  }
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">

        <div className="text-3xl md:text-4xl xl:text-6xl font-bold text-white mb-8 md:mb-10 tracking-tight space-y-4">
          <TextType
            text={challengeConstants.headline}
            typingSpeed={60}
            pauseDuration={3000}
            className="text-lg md:text-2xl xl:text-5xl"
          />
          <br />
          <BlurText
            text={challengeConstants.name}
            className="text-emerald-400 inline"
            delay={100}
            animateBy="words"
            stepDuration={0.4}
          />
        </div>

        <FadeContent duration={800} delay={600}>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            {challengeConstants.subheadline}
          </p>
        </FadeContent>

        <CountdownTimer
          targetDate={challengeConstants.dates.registrationOpen}
        />

        {!registrationStatus.isClosed && (
          <div className="mt-8">
            <AnimatedContent
              distance={30}
              duration={0.6}
              delay={900}
              ease="back.out(1.2)"
            >
              <StarBorder
                as="button"
                color="#50d8af"
                speed="4s"
                thickness={2}
                variant="emerald"
                className={cn(
                  'font-semibold text-lg',
                  registrationStatus.isAvailable
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed',
                )}
                onClick={handleJoinChallenge}
                disabled={
                  registrationStatus.isLoading ||
                  !registrationStatus.isAvailable
                }
              >
                {registrationStatus.isLoading
                  ? 'Loading...'
                  : registrationStatus.isAvailable
                    ? 'Join the Challenge'
                    : 'Registration Coming Soon'}
              </StarBorder>
            </AnimatedContent>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-900 via-slate-900/85 to-transparent" />
    </section>
  )
}
