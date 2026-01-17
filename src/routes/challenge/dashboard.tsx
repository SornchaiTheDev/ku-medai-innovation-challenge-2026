import { createFileRoute } from '@tanstack/react-router'
import { createAuthClient } from 'better-auth/client'
import { useEffect, useState } from 'react'
import { LogOut } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'

export const Route = createFileRoute('/challenge/dashboard')({
  component: DashboardPage,
})

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
})

interface TeamData {
  id: number
  name: string
  track: 'agro_medicine' | 'bioinnovation'
  status: string
  members: Array<{
    id: number
    userId: string | null
    name: string
    phone: string
    educationType: string
    educationDetails: string
    isLeader: boolean
  }>
}

interface DashboardData {
  team: TeamData
}

function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkSessionAndFetch = async () => {
      try {
        const { data: sessionData } = await authClient.getSession()
        if (!sessionData) {
          window.location.href = '/challenge/register'
          return
        }

        const response = await fetch('/api/team/get')
        if (response.ok) {
          const teamData = await response.json()
          setData(teamData)
        } else if (response.status === 404) {
          window.location.href = '/challenge/register'
          return
        } else {
          setError('Failed to load team data')
        }
      } catch {
        setError('An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    checkSessionAndFetch()
  }, [])

  const handleSignOut = async () => {
    await authClient.signOut()
    window.location.href = '/challenge'
  }

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <AnimatedContent
          direction="vertical"
          distance={30}
          duration={0.5}
          className="w-full max-w-md text-center"
        >
          <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-8 shadow-2xl">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-4 bg-aiih-secondary hover:bg-aiih-secondary/90 text-aiih-primary font-semibold rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </AnimatedContent>
      </div>
    )
  }

  if (!data) {
    return null
  }

  const { team } = data

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto">
        <AnimatedContent
          direction="vertical"
          distance={20}
          duration={0.5}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Team Dashboard
              </h1>
              <p className="text-aiih-secondary text-lg">
                KU MedAI Innovation Challenge 2026
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </AnimatedContent>

        <div className="grid gap-6">
          <AnimatedContent
            direction="vertical"
            distance={20}
            duration={0.4}
            delay={0.1}
            className="md:col-span-2"
          >
            <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-6 shadow-2xl">
              <h2 className="text-lg font-semibold text-white mb-4">
                Team Information
              </h2>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-slate-400">Team Name</dt>
                  <dd className="font-medium text-white">{team.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">Track</dt>
                  <dd className="font-medium">
                    {team.track === 'agro_medicine' ? (
                      <span className="text-green-400">🌱 Agro-medicine</span>
                    ) : (
                      <span className="text-purple-400">🧬 Bioinnovation</span>
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">Status</dt>
                  <dd className="font-medium capitalize text-aiih-secondary">
                    {team.status}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">Members</dt>
                  <dd className="font-medium text-white">
                    {team.members.length} / 5
                  </dd>
                </div>
              </dl>
            </div>
          </AnimatedContent>

          <AnimatedContent
            direction="vertical"
            distance={20}
            duration={0.4}
            delay={0.2}
            className="md:col-span-2"
          >
            <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-6 shadow-2xl">
              <h2 className="text-lg font-semibold text-white mb-4">
                Team Members
              </h2>
              <div className="space-y-3">
                {team.members.map((member) => {
                  const details = JSON.parse(member.educationDetails)
                  return (
                    <div
                      key={member.id}
                      className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-medium text-white flex items-center gap-2">
                            {member.name}
                            {member.isLeader && (
                              <span className="px-2 py-0.5 rounded-full bg-aiih-secondary/20 text-aiih-secondary text-xs font-medium">
                                Leader
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-slate-400">
                            {member.phone}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        {member.educationType === 'high_school' ? (
                          <span className="text-slate-300">
                            {details.schoolName} ({details.grade})
                          </span>
                        ) : (
                          <span className="text-slate-300">
                            {details.university} - {details.faculty}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </AnimatedContent>
        </div>

        <AnimatedContent
          direction="vertical"
          distance={20}
          duration={0.4}
          delay={0.4}
        >
          <div className="mt-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-white mb-3">
              Important Dates
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-aiih-secondary">📅</span>
                <span>
                  <strong className="text-white">Registration:</strong> Open
                  until February 9, 2026
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-aiih-secondary">📤</span>
                <span>
                  <strong className="text-white">Submission Deadline:</strong>{' '}
                  March 5, 2026
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-aiih-secondary">🏆</span>
                <span>
                  <strong className="text-white">Final Pitch:</strong> March 7,
                  2026
                </span>
              </li>
            </ul>
          </div>
        </AnimatedContent>
      </div>
    </div>
  )
}
