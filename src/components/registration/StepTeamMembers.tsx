'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Trash2, Plus } from 'lucide-react'

interface TeamMemberData {
  id: string
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

export interface MemberOutput {
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

interface StepTeamMembersProps {
  onNext: (members: MemberOutput[]) => void
  onBack: () => void
  initialMembers?: MemberOutput[]
}

export function StepTeamMembers({
  onNext,
  onBack,
  initialMembers = [],
}: StepTeamMembersProps) {
  const [members, setMembers] = useState<TeamMemberData[]>(
    initialMembers.map((m) => ({ ...m, id: crypto.randomUUID() })),
  )
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>(
    {},
  )

  const addMember = () => {
    if (members.length >= 4) return
    const newMember: TeamMemberData = {
      id: crypto.randomUUID(),
      name: '',
      phone: '',
      educationType: 'university',
      educationDetails: { type: 'university' },
    }
    setMembers([...members, newMember])
  }

  const removeMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id))
    const newErrors = { ...errors }
    delete newErrors[id]
    setErrors(newErrors)
  }

  const updateMember = (id: string, field: string, value: any) => {
    setMembers(
      members.map((m) =>
        m.id === id
          ? {
              ...m,
              [field]: value,
              ...(field === 'educationType'
                ? { educationDetails: { type: value } }
                : {}),
            }
          : m,
      ),
    )
  }

  const updateMemberEducation = (
    id: string,
    details: TeamMemberData['educationDetails'],
  ) => {
    setMembers(
      members.map((m) =>
        m.id === id ? { ...m, educationDetails: details } : m,
      ),
    )
  }

  const validateThaiPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length >= 9 && cleaned.length <= 10
  }

  const validateMembers = () => {
    const newErrors: Record<string, Record<string, string>> = {}

    members.forEach((member) => {
      const memberErrors: Record<string, string> = {}

      if (!member.name.trim()) {
        memberErrors.name = 'Name is required'
      }

      if (!member.phone.trim()) {
        memberErrors.phone = 'Phone is required'
      } else if (!validateThaiPhone(member.phone)) {
        memberErrors.phone = 'Invalid Thai phone number'
      }

      if (member.educationType === 'high_school') {
        if (!member.educationDetails.schoolName?.trim()) {
          memberErrors.schoolName = 'School name is required'
        }
        if (!member.educationDetails.grade) {
          memberErrors.grade = 'Grade is required'
        }
      } else {
        if (!member.educationDetails.university?.trim()) {
          memberErrors.university = 'University is required'
        }
        if (!member.educationDetails.faculty?.trim()) {
          memberErrors.faculty = 'Faculty is required'
        }
        if (!member.educationDetails.studentId?.trim()) {
          memberErrors.studentId = 'Student ID is required'
        }
      }

      if (Object.keys(memberErrors).length > 0) {
        newErrors[member.id] = memberErrors
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (members.length < 2) {
      alert('You need at least 2 team members (3-5 total including team lead)')
      return
    }
    if (members.length > 4) {
      alert(
        'You can have at most 4 team members (3-5 total including team lead)',
      )
      return
    }
    if (validateMembers()) {
      onNext(members.map(({ id, ...rest }) => rest))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Team Members</h3>
          <p className="text-sm text-muted-foreground">
            Add 2-4 members (team will have 3-5 people including you)
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addMember}
          disabled={members.length >= 4}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Member
        </Button>
      </div>

      {members.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No team members added yet. Click "Add Member" to add your first
          member.
        </div>
      )}

      <div className="space-y-4">
        {members.map((member, index) => (
          <div key={member.id} className="rounded-lg border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Member {index + 1}</span>
              <button
                type="button"
                onClick={() => removeMember(member.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name *</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) =>
                    updateMember(member.id, 'name', e.target.value)
                  }
                  placeholder="Thai and English name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                {errors[member.id]?.name && (
                  <p className="text-sm text-red-500">
                    {errors[member.id].name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone *</label>
                <input
                  type="tel"
                  value={member.phone}
                  onChange={(e) =>
                    updateMember(member.id, 'phone', e.target.value)
                  }
                  placeholder="0xx-xxx-xxxx"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                {errors[member.id]?.phone && (
                  <p className="text-sm text-red-500">
                    {errors[member.id].phone}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Education Level *</label>
              <div className="grid gap-2 sm:grid-cols-2">
                <div
                  onClick={() => {
                    updateMember(member.id, 'educationType', 'high_school')
                    updateMemberEducation(member.id, { type: 'high_school' })
                  }}
                  className={cn(
                    'cursor-pointer rounded-lg border-2 p-3 transition-all',
                    member.educationType === 'high_school'
                      ? 'border-primary bg-accent'
                      : 'border-border',
                  )}
                >
                  <div className="font-medium text-sm">High School</div>
                </div>
                <div
                  onClick={() => {
                    updateMember(member.id, 'educationType', 'university')
                    updateMemberEducation(member.id, { type: 'university' })
                  }}
                  className={cn(
                    'cursor-pointer rounded-lg border-2 p-3 transition-all',
                    member.educationType === 'university'
                      ? 'border-primary bg-accent'
                      : 'border-border',
                  )}
                >
                  <div className="font-medium text-sm">University</div>
                </div>
              </div>
            </div>

            {member.educationType === 'high_school' ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">School Name *</label>
                  <input
                    type="text"
                    value={member.educationDetails.schoolName || ''}
                    onChange={(e) =>
                      updateMemberEducation(member.id, {
                        ...member.educationDetails,
                        schoolName: e.target.value,
                      })
                    }
                    placeholder="School name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  {errors[member.id]?.schoolName && (
                    <p className="text-sm text-red-500">
                      {errors[member.id].schoolName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Grade *</label>
                  <select
                    value={member.educationDetails.grade || ''}
                    onChange={(e) =>
                      updateMemberEducation(member.id, {
                        ...member.educationDetails,
                        grade: e.target.value,
                      })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select grade</option>
                    <option value="M.4">M.4</option>
                    <option value="M.5">M.5</option>
                    <option value="M.6">M.6</option>
                  </select>
                  {errors[member.id]?.grade && (
                    <p className="text-sm text-red-500">
                      {errors[member.id].grade}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">University *</label>
                  <input
                    type="text"
                    value={member.educationDetails.university || ''}
                    onChange={(e) =>
                      updateMemberEducation(member.id, {
                        ...member.educationDetails,
                        university: e.target.value,
                      })
                    }
                    placeholder="University"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  {errors[member.id]?.university && (
                    <p className="text-sm text-red-500">
                      {errors[member.id].university}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Faculty *</label>
                  <input
                    type="text"
                    value={member.educationDetails.faculty || ''}
                    onChange={(e) =>
                      updateMemberEducation(member.id, {
                        ...member.educationDetails,
                        faculty: e.target.value,
                      })
                    }
                    placeholder="Faculty"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  {errors[member.id]?.faculty && (
                    <p className="text-sm text-red-500">
                      {errors[member.id].faculty}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Student ID *</label>
                  <input
                    type="text"
                    value={member.educationDetails.studentId || ''}
                    onChange={(e) =>
                      updateMemberEducation(member.id, {
                        ...member.educationDetails,
                        studentId: e.target.value,
                      })
                    }
                    placeholder="Student ID"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  {errors[member.id]?.studentId && (
                    <p className="text-sm text-red-500">
                      {errors[member.id].studentId}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button type="submit" className="flex-1">
          Continue
        </Button>
      </div>
    </form>
  )
}
