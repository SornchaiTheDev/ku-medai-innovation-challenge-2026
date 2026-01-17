'use client'

import { useState } from 'react'
import { Leaf, Microscope } from 'lucide-react'
import { RegistrationContinueButton } from './RegistrationContinueButton'
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
          className="text-sm font-semibold text-slate-200"
        >
          Team Name <span className="text-aiih-secondary">*</span>
        </label>
        <input
          id="teamName"
          type="text"
          value={teamName}
          onChange={(e) => {
            setTeamName(e.target.value)
            if (e.target.value.trim() && e.target.value.length >= 3) {
              setErrors((prev) => {
                const next = { ...prev }
                delete next.teamName
                return next
              })
            }
          }}
          onBlur={() => {
            if (!teamName.trim()) {
              setErrors((prev) => ({
                ...prev,
                teamName: 'Team name is required',
              }))
            } else if (teamName.length < 3) {
              setErrors((prev) => ({
                ...prev,
                teamName: 'Team name must be at least 3 characters',
              }))
            }
          }}
          placeholder="Enter your creative team name"
          className={cn(
            'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
            'transition-all duration-200',
            errors.teamName
              ? 'border-red-500/50 focus-visible:ring-red-500'
              : 'border-slate-700 hover:border-slate-600',
          )}
        />
        {errors.teamName && (
          <p className="text-sm text-red-400 flex items-center gap-1">
            <svg
              className="w-4 h-4"
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
            {errors.teamName}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-200">
          Competition Track <span className="text-aiih-secondary">*</span>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <div
            onClick={() => {
              setTrack('agro_medicine')
              setErrors((prev) => {
                const next = { ...prev }
                delete next.track
                return next
              })
            }}
            className={cn(
              'cursor-pointer rounded-xl border-2 p-5 transition-all duration-300',
              'hover:scale-[1.02] hover:shadow-lg',
              track === 'agro_medicine'
                ? 'border-aiih-secondary bg-aiih-secondary/10 shadow-lg shadow-aiih-secondary/10'
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600',
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  track === 'agro_medicine'
                    ? 'bg-aiih-secondary text-aiih-primary'
                    : 'bg-slate-700 text-slate-300',
                )}
              >
                <Leaf className="w-5 h-5" />
              </div>
              <div className="font-semibold text-white">Agro-medicine</div>
            </div>
            <div className="text-xs text-slate-400">
              Smart Health for Agriculture
            </div>
          </div>
          <div
            onClick={() => {
              setTrack('bioinnovation')
              setErrors((prev) => {
                const next = { ...prev }
                delete next.track
                return next
              })
            }}
            className={cn(
              'cursor-pointer rounded-xl border-2 p-5 transition-all duration-300',
              'hover:scale-[1.02] hover:shadow-lg',
              track === 'bioinnovation'
                ? 'border-aiih-secondary bg-aiih-secondary/10 shadow-lg shadow-aiih-secondary/10'
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600',
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  track === 'bioinnovation'
                    ? 'bg-aiih-secondary text-aiih-primary'
                    : 'bg-slate-700 text-slate-300',
                )}
              >
                <Microscope className="w-5 h-5" />
              </div>
              <div className="font-semibold text-white">Bioinnovation</div>
            </div>
            <div className="text-xs text-slate-400">Medical AI & Tech</div>
          </div>
        </div>
        {errors.track && (
          <p className="text-sm text-red-400 flex items-center gap-1">
            <svg
              className="w-4 h-4"
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
            {errors.track}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <RegistrationContinueButton type="submit" />
      </div>
    </form>
  )
}
