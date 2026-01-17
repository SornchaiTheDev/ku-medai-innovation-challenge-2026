'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface StepTeamInfoProps {
  onNext: (data: {
    teamName: string
    track: 'agro_medicine' | 'bioinnovation'
  }) => void
  initialData?: { teamName: string; track: 'agro_medicine' | 'bioinnovation' }
}

export function StepTeamInfo({ onNext, initialData }: StepTeamInfoProps) {
  const [teamName, setTeamName] = useState(initialData?.teamName || '')
  const [track, setTrack] = useState<'agro_medicine' | 'bioinnovation'>(
    initialData?.track || 'agro_medicine',
  )
  const [errors, setErrors] = useState<{ teamName?: string; track?: string }>(
    {},
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { teamName?: string; track?: string } = {}

    if (!teamName.trim()) {
      newErrors.teamName = 'Team name is required'
    } else if (teamName.length < 3) {
      newErrors.teamName = 'Team name must be at least 3 characters'
    }

    if (!track) {
      newErrors.track = 'Please select a track'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onNext({ teamName, track })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="teamName"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Team Name *
        </label>
        <input
          id="teamName"
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter your team name"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {errors.teamName && (
          <p className="text-sm text-red-500">{errors.teamName}</p>
        )}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium leading-none">
          Competition Track *
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <div
            onClick={() => setTrack('agro_medicine')}
            className={cn(
              'cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-green-500/50',
              track === 'agro_medicine'
                ? 'border-green-500 bg-green-50'
                : 'border-border',
            )}
          >
            <div className="flex items-center gap-2">
              <div className="text-2xl">🌱</div>
              <div>
                <div className="font-semibold">Agro-medicine</div>
                <div className="text-xs text-muted-foreground">
                  Smart Health for Agriculture
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => setTrack('bioinnovation')}
            className={cn(
              'cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-blue-500/50',
              track === 'bioinnovation'
                ? 'border-blue-500 bg-blue-50'
                : 'border-border',
            )}
          >
            <div className="flex items-center gap-2">
              <div className="text-2xl">🧬</div>
              <div>
                <div className="font-semibold">Bioinnovation</div>
                <div className="text-xs text-muted-foreground">
                  Medical AI & Tech
                </div>
              </div>
            </div>
          </div>
        </div>
        {errors.track && <p className="text-sm text-red-500">{errors.track}</p>}
      </div>

      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  )
}
