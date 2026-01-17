'use client'

import {
  CheckCircle2,
  GraduationCap,
  Leaf,
  Microscope,
  School,
  Trophy,
  User,
  Users,
} from 'lucide-react'
import { RegistrationBackButton } from './RegistrationBackButton'
import { RegistrationContinueButton } from './RegistrationContinueButton'

interface SummaryMember {
  name: string
  phone: string
  educationType: 'high_school' | 'university'
  educationDetails: {
    type: 'high_school' | 'university'
    schoolName?: string
    grade?: string
    university?: string
    faculty?: string
  }
}

interface RegistrationSummaryProps {
  teamName: string
  track: 'agro_medicine' | 'bioinnovation'
  user: { name: string; email: string }
  leaderPhone: string
  leaderEducation: {
    type: 'high_school' | 'university'
    schoolName?: string
    grade?: string
    university?: string
    faculty?: string
  }
  members: Array<SummaryMember>
  consent: { rules: boolean; photo: boolean; data: boolean }
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
}

export function RegistrationSummary({
  teamName,
  track,
  user,
  leaderPhone,
  leaderEducation,
  members,
  onSubmit,
  onBack,
  isSubmitting,
}: RegistrationSummaryProps) {
  const totalMembers = members.length + 1
  const isValidTeamSize = totalMembers >= 3 && totalMembers <= 5

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-aiih-secondary" />
          Review Your Registration
        </h3>
        <p className="text-sm text-slate-400">
          Please review all details before submitting. You can go back to make
          changes.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-aiih-secondary/20 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-aiih-secondary" />
            </div>
            <h4 className="font-semibold text-white">Team Information</h4>
          </div>
          <div className="grid gap-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
              <span className="text-sm text-slate-400">Team Name</span>
              <span className="font-medium text-white">{teamName}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
              <span className="text-sm text-slate-400">Track</span>
              <span className="flex items-center gap-2 font-medium text-white">
                {track === 'agro_medicine' ? (
                  <>
                    <Leaf className="w-4 h-4 text-green-400" />
                    Agro-medicine
                  </>
                ) : (
                  <>
                    <Microscope className="w-4 h-4 text-blue-400" />
                    Bioinnovation
                  </>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-400">Team Size</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-white">
                  {totalMembers} / 3-5
                </span>
                {isValidTeamSize ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                  <span className="text-red-400 text-xs">Invalid</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-aiih-secondary/20 flex items-center justify-center">
              <User className="w-4 h-4 text-aiih-secondary" />
            </div>
            <h4 className="font-semibold text-white">Team Lead (You)</h4>
          </div>
          <div className="grid gap-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
              <span className="text-sm text-slate-400">Name</span>
              <span className="font-medium text-white">{user.name}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
              <span className="text-sm text-slate-400">Email</span>
              <span className="font-medium text-white">{user.email}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
              <span className="text-sm text-slate-400">Phone</span>
              <span className="font-medium text-white">{leaderPhone}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-400">Education</span>
              <span className="font-medium text-white flex items-center gap-2">
                {leaderEducation.type === 'high_school' ? (
                  <>
                    <School className="w-4 h-4 text-slate-400" />
                    {leaderEducation.schoolName} ({leaderEducation.grade})
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-4 h-4 text-slate-400" />
                    {leaderEducation.university} - {leaderEducation.faculty}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-aiih-secondary/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-aiih-secondary" />
            </div>
            <h4 className="font-semibold text-white">
              Team Members ({members.length})
            </h4>
          </div>
          {members.length === 0 ? (
            <p className="text-sm text-slate-500 py-2">No additional members</p>
          ) : (
            <div className="space-y-3">
              {members.map((member, index) => (
                <div
                  key={index}
                  className="py-3 border-b border-slate-700/50 last:border-0"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-white">
                      {member.name}
                    </span>
                    <span className="text-sm text-slate-400">
                      {member.phone}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    {member.educationType === 'high_school' ? (
                      <>
                        <School className="w-3 h-3" />
                        {member.educationDetails.schoolName} (
                        {member.educationDetails.grade})
                      </>
                    ) : (
                      <>
                        <GraduationCap className="w-3 h-3" />
                        {member.educationDetails.university} -{' '}
                        {member.educationDetails.faculty}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="font-medium text-green-400">Consent Given</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              Rules Accepted
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              Photo Consent
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              Data Processing
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <RegistrationBackButton onClick={onBack} disabled={isSubmitting} />
        <RegistrationContinueButton
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || !isValidTeamSize}
          isLoading={isSubmitting}
        >
          Confirm Registration
        </RegistrationContinueButton>
      </div>
    </div>
  )
}
