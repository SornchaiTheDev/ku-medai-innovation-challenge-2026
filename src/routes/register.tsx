import { Link, createFileRoute } from '@tanstack/react-router'
import { createAuthClient } from 'better-auth/client'
import { useEffect, useState } from 'react'
import {
  CheckCircle2,
  ClipboardCheck,
  ShieldCheck,
  UserCog,
  Users,
} from 'lucide-react'
import { AuthButton } from '@/components/auth/AuthButton'
import { StepTeamInfo } from '@/components/registration/StepTeamInfo'
import { StepTeamLead } from '@/components/registration/StepTeamLead'
import { StepTeamMembers } from '@/components/registration/StepTeamMembers'
import { StepConsent } from '@/components/registration/StepConsent'
import { RegistrationSummary } from '@/components/registration/RegistrationSummary'
import { cn } from '@/lib/utils'
import AnimatedContent from '@/components/AnimatedContent'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

type Step = 'teamInfo' | 'teamLead' | 'teamMembers' | 'consent' | 'summary'

interface TeamInfoData {
  teamName: string
  track: 'agro_medicine' | 'bioinnovation'
}

interface TeamLeadData {
  phone: string
  educationType: 'high_school' | 'university'
  educationDetails: {
    type: 'high_school' | 'university'
    schoolName?: string
    grade?: string
    university?: string
    faculty?: string
    studentId?: string
  }
}

interface MemberData {
  name: string
  phone: string
  educationType: 'high_school' | 'university'
  educationDetails: {
    type: 'high_school' | 'university'
    schoolName?: string
    grade?: string
    university?: string
    faculty?: string
    studentId?: string
  }
}

interface ConsentData {
  rules: boolean
  photo: boolean
  data: boolean
}

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
})

function RegisterPage() {
  const [session, setSession] = useState<{ user: any; session: any } | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false)
  const [step, setStep] = useState<Step>('teamInfo')
  const [teamInfo, setTeamInfo] = useState<TeamInfoData | null>(null)
  const [teamLead, setTeamLead] = useState<TeamLeadData | null>(null)
  const [members, setMembers] = useState<Array<MemberData>>([])
  const [consent, setConsent] = useState<ConsentData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await authClient.getSession()
        setSession(data)

        if (data?.user) {
          const response = await fetch('/api/team/check-registration')
          const result = await response.json()
          if (result.isRegistered) {
            setIsAlreadyRegistered(true)
          }
        }
      } catch {
        setSession(null)
      } finally {
        setIsLoading(false)
      }
    }
    checkSession()
  }, [])

  useEffect(() => {
    const unsubscribe = authClient.useSession.subscribe((newSession) => {
      setSession(newSession.data)
    })
    return () => unsubscribe()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-aiih-secondary mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAlreadyRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <AnimatedContent
          direction="vertical"
          distance={30}
          duration={0.5}
          className="w-full max-w-md text-center"
        >
          <div className="mb-8">
            <div className="w-20 h-20 bg-aiih-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-aiih-secondary" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              You're Already Registered!
            </h1>
            <p className="text-slate-400 text-lg">
              Your team is all set for the KU MedAI Innovation Challenge 2026
            </p>
          </div>
          <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-8 shadow-2xl">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center w-full py-3 px-4 bg-aiih-secondary hover:bg-aiih-secondary/90 text-aiih-primary font-semibold rounded-lg transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </AnimatedContent>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <AnimatedContent
          direction="vertical"
          distance={30}
          duration={0.5}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Join the Challenge
            </h1>
            <p className="text-aiih-secondary text-lg">
              Sign in to register your team
            </p>
          </div>
          <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-8 shadow-2xl">
            <AuthButton />
          </div>
        </AnimatedContent>
      </div>
    )
  }

  const handleTeamInfoNext = (data: TeamInfoData) => {
    setTeamInfo(data)
    setStep('teamLead')
  }

  const handleTeamLeadNext = (data: TeamLeadData) => {
    setTeamLead(data)
    setStep('teamMembers')
  }

  const handleTeamMembersNext = (data: Array<MemberData>) => {
    setMembers(data)
    setStep('consent')
  }

  const handleConsentNext = (data: ConsentData) => {
    setConsent(data)
    setStep('summary')
  }

  const isStepFilled = (stepKey: Step): boolean => {
    switch (stepKey) {
      case 'teamInfo':
        return !!teamInfo
      case 'teamLead':
        return !!teamLead
      case 'teamMembers':
        return members.length >= 2
      case 'consent':
        return !!consent
      case 'summary':
        return !!teamInfo && !!teamLead && !!consent && members.length >= 2
      default:
        return false
    }
  }

  const handleStepClick = (targetStep: Step, targetIndex: number) => {
    if (targetIndex <= currentStepIndex) {
      setStep(targetStep)
    } else if (isStepFilled(targetStep)) {
      setStep(targetStep)
    }
  }

  const isStepClickable = (stepKey: Step, index: number): boolean => {
    return index <= currentStepIndex || isStepFilled(stepKey)
  }

  const handleSubmit = async () => {
    if (!teamInfo || !teamLead || !consent) return

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/team/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName: teamInfo.teamName,
          track: teamInfo.track,
          leaderProfile: {
            phone: teamLead.phone,
            educationType: teamLead.educationType,
            educationDetails: teamLead.educationDetails,
          },
          members: members.map((m) => ({
            name: m.name,
            phone: m.phone,
            educationType: m.educationType,
            educationDetails: m.educationDetails,
          })),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create team')
      }

      window.location.href = '/dashboard'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps: Array<{ key: Step; label: string; icon: React.ReactNode }> = [
    {
      key: 'teamInfo',
      label: 'Team Info',
      icon: <Users className="w-4 h-4" />,
    },
    {
      key: 'teamLead',
      label: 'Team Lead',
      icon: <UserCog className="w-4 h-4" />,
    },
    {
      key: 'teamMembers',
      label: 'Members',
      icon: <Users className="w-4 h-4" />,
    },
    {
      key: 'consent',
      label: 'Consent',
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      key: 'summary',
      label: 'Review',
      icon: <ClipboardCheck className="w-4 h-4" />,
    },
  ]

  const currentStepIndex = steps.findIndex((s) => s.key === step)

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="max-w-2xl mx-auto">
        <AnimatedContent
          direction="vertical"
          distance={20}
          duration={0.5}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Register Your Team
          </h1>
          <p className="text-aiih-secondary text-lg">
            KU MedAI Innovation Challenge 2026
          </p>
        </AnimatedContent>

        <div className="mb-8 min-h-[110px]">
          <div className="relative h-14">
            <div className="absolute top-5 left-[30px] right-0 h-0.5 bg-slate-700" />
            <div
              className="absolute top-5 left-[30px] h-0.5 bg-aiih-secondary transition-all duration-500 ease-out"
              style={{
                width: `calc(${(currentStepIndex / (steps.length - 1)) * 100}% - 30px)`,
              }}
            />
            <div className="relative flex justify-between">
              {steps.map((s, index) => {
                const isCompleted = index < currentStepIndex
                const isCurrent = index === currentStepIndex
                const isFilled = isStepFilled(s.key)
                const isClickable = isStepClickable(s.key, index)
                return (
                  <div key={s.key} className="flex flex-col items-center">
                    <div
                      onClick={() =>
                        isClickable && handleStepClick(s.key, index)
                      }
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                        isCompleted || isCurrent || isFilled
                          ? 'bg-aiih-secondary text-aiih-primary'
                          : 'bg-slate-800 text-slate-500 border border-slate-700',
                        isCurrent && 'ring-4 ring-aiih-secondary/20 scale-110',
                        isClickable &&
                          index !== currentStepIndex &&
                          'cursor-pointer hover:scale-105',
                        isClickable &&
                          index === currentStepIndex &&
                          'cursor-default',
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        s.icon
                      )}
                    </div>
                    <span
                      className={cn(
                        'mt-2 text-xs font-medium transition-colors duration-300',
                        isCompleted || isCurrent || isFilled
                          ? 'text-white'
                          : 'text-slate-500',
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <AnimatedContent
          direction="vertical"
          distance={30}
          duration={0.4}
          className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-6 shadow-2xl"
        >
          {step === 'teamInfo' && (
            <StepTeamInfo
              onNext={handleTeamInfoNext}
              initialData={teamInfo || undefined}
            />
          )}
          {step === 'teamLead' && (
            <StepTeamLead
              user={session.user}
              onNext={handleTeamLeadNext}
              onBack={() => setStep('teamInfo')}
              initialData={
                teamLead
                  ? {
                      phone: teamLead.phone,
                      educationType: teamLead.educationType,
                      educationDetails: teamLead.educationDetails,
                    }
                  : undefined
              }
            />
          )}
          {step === 'teamMembers' && (
            <StepTeamMembers
              onNext={handleTeamMembersNext}
              onBack={() => setStep('teamLead')}
              initialMembers={members}
            />
          )}
          {step === 'consent' && (
            <StepConsent
              onNext={handleConsentNext}
              onBack={() => setStep('teamMembers')}
            />
          )}
          {step === 'summary' && teamInfo && teamLead && consent && (
            <RegistrationSummary
              teamName={teamInfo.teamName}
              track={teamInfo.track}
              user={session.user}
              leaderPhone={teamLead.phone}
              leaderEducation={teamLead.educationDetails}
              members={members}
              consent={consent}
              onSubmit={handleSubmit}
              onBack={() => setStep('consent')}
              isSubmitting={isSubmitting}
            />
          )}

          {error && (
            <div className="mt-4 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}
        </AnimatedContent>
      </div>
    </div>
  )
}
