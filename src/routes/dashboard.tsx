import { createFileRoute } from '@tanstack/react-router'
import { createAuthClient } from 'better-auth/client'
import { useEffect, useState } from 'react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/dashboard')({
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
    name: string
    phone: string
    educationType: string
    educationDetails: string
  }>
}

interface ProfileData {
  id: number
  userId: string
  phone: string
  educationType: string
  schoolName: string | null
  grade: string | null
  university: string | null
  faculty: string | null
  studentId: string | null
}

interface DashboardData {
  team: TeamData
  profile: ProfileData
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
          window.location.href = '/register'
          return
        }

        const response = await fetch('/api/team/get')
        if (response.ok) {
          const teamData = await response.json()
          setData(teamData)
        } else if (response.status === 404) {
          window.location.href = '/register'
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
    window.location.href = '/'
  }

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  const { team, profile } = data

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Team Dashboard</h1>
            <p className="text-muted-foreground">
              KU MedAI Innovation Challenge 2026
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Team Information</h2>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Team Name</dt>
                <dd className="font-medium">{team.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Track</dt>
                <dd className="font-medium">
                  {team.track === 'agro_medicine'
                    ? '🌱 Agro-medicine'
                    : '🧬 Bioinnovation'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Status</dt>
                <dd className="font-medium capitalize">{team.status}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Members</dt>
                <dd className="font-medium">{team.members.length + 1} / 5</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Team Lead (You)</h2>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="font-medium">{profile.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Education</dt>
                <dd className="font-medium text-right">
                  {profile.educationType === 'high_school'
                    ? `${profile.schoolName} (${profile.grade})`
                    : `${profile.university} - ${profile.faculty}`}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border p-6 md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Team Members</h2>
            <div className="space-y-3">
              {team.members.map((member) => {
                const details = JSON.parse(member.educationDetails)
                return (
                  <div
                    key={member.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.phone}
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      {member.educationType === 'high_school'
                        ? `${details.schoolName} (${details.grade})`
                        : `${details.university} - ${details.faculty}`}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border p-6 bg-muted/50">
          <h2 className="text-lg font-semibold mb-2">Important Dates</h2>
          <ul className="space-y-2 text-sm">
            <li>
              📅 <strong>Registration:</strong> Open until February 9, 2026
            </li>
            <li>
              📤 <strong>Submission Deadline:</strong> March 5, 2026
            </li>
            <li>
              🏆 <strong>Final Pitch:</strong> March 7, 2026
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
