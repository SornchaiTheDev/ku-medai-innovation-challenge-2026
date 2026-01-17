import { createFileRoute } from '@tanstack/react-router'
import { createAuthClient } from 'better-auth/client'
import { AuthButton } from '@/components/auth/AuthButton'
import { StepTeamInfo } from '@/components/registration/StepTeamInfo'
import { StepTeamLead } from '@/components/registration/StepTeamLead'
import { StepTeamMembers } from '@/components/registration/StepTeamMembers'
import { StepConsent } from '@/components/registration/StepConsent'
import { RegistrationSummary } from '@/components/registration/RegistrationSummary'
import { useEffect, useState } from 'react'

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
  const [step, setStep] = useState<Step>('teamInfo')
  const [teamInfo, setTeamInfo] = useState<TeamInfoData | null>(null)
  const [teamLead, setTeamLead] = useState<TeamLeadData | null>(null)
  const [members, setMembers] = useState<MemberData[]>([])
  const [consent, setConsent] = useState<ConsentData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await authClient.getSession()
        setSession(data)
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              Register for KU MedAI Challenge
            </h1>
            <p className="text-muted-foreground mt-2">
              Sign in with your Google account to continue
            </p>
          </div>
          <div className="rounded-lg border p-6 bg-card">
            <AuthButton />
          </div>
        </div>
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

  const handleTeamMembersNext = (data: MemberData[]) => {
    setMembers(data)
    setStep('consent')
  }

  const handleConsentNext = (data: ConsentData) => {
    setConsent(data)
    setStep('summary')
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

  const steps: { key: Step; label: string }[] = [
    { key: 'teamInfo', label: 'Team' },
    { key: 'teamLead', label: 'Lead' },
    { key: 'teamMembers', label: 'Members' },
    { key: 'consent', label: 'Consent' },
    { key: 'summary', label: 'Review' },
  ]

  const currentStepIndex = steps.findIndex((s) => s.key === step)

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center">Register Your Team</h1>
          <p className="text-muted-foreground text-center">
            KU MedAI Innovation Challenge 2026
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.key} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStepIndex
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Team Info</span>
            <span>Lead</span>
            <span>Members</span>
            <span>Consent</span>
            <span>Review</span>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
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
            <div className="mt-4 p-3 rounded-md bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
