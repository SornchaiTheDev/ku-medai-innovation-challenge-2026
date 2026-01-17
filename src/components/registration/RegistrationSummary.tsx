'use client'

import { Button } from '@/components/ui/button'

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
    studentId?: string
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
    studentId?: string
  }
  members: SummaryMember[]
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Review Your Registration</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Please review all details before submitting. You can go back to make
          changes.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <h4 className="font-medium mb-2">Team Information</h4>
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Team Name:</dt>
              <dd className="font-medium">{teamName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Track:</dt>
              <dd className="font-medium">
                {track === 'agro_medicine'
                  ? '🌱 Agro-medicine'
                  : '🧬 Bioinnovation'}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Total Members:</dt>
              <dd className="font-medium">{totalMembers} / 3-5 required</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border p-4">
          <h4 className="font-medium mb-2">Team Lead (You)</h4>
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Name:</dt>
              <dd className="font-medium">{user.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Email:</dt>
              <dd className="font-medium">{user.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Phone:</dt>
              <dd className="font-medium">{leaderPhone}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Education:</dt>
              <dd className="font-medium">
                {leaderEducation.type === 'high_school'
                  ? `${leaderEducation.schoolName} (${leaderEducation.grade})`
                  : `${leaderEducation.university} - ${leaderEducation.faculty}`}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border p-4">
          <h4 className="font-medium mb-2">Team Members ({members.length})</h4>
          {members.map((member, index) => (
            <div key={index} className="py-2 border-b last:border-0">
              <div className="font-medium">{member.name}</div>
              <div className="text-xs text-muted-foreground">
                {member.phone} •{' '}
                {member.educationType === 'high_school'
                  ? `${member.educationDetails.schoolName} (${member.educationDetails.grade})`
                  : `${member.educationDetails.university} - ${member.educationDetails.faculty}`}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Confirm Registration'}
        </Button>
      </div>
    </div>
  )
}
