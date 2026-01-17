'use client'

import { useState } from 'react'
import { GraduationCap, Phone, Plus, School, Trash2, User } from 'lucide-react'
import { RegistrationBackButton } from './RegistrationBackButton'
import { RegistrationContinueButton } from './RegistrationContinueButton'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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
  onNext: (members: Array<MemberOutput>) => void
  onBack: () => void
  initialMembers?: Array<MemberOutput>
}

export function StepTeamMembers({
  onNext,
  onBack,
  initialMembers = [],
}: StepTeamMembersProps) {
  const [members, setMembers] = useState<Array<TeamMemberData>>(
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
    if (field === 'name' && value.trim()) {
      setErrors((prev) => {
        const next = { ...prev }
        if (next[id]) {
          delete next[id].name
        }
        return next
      })
    }
    if (field === 'phone' && value.trim() && validateThaiPhone(value)) {
      setErrors((prev) => {
        const next = { ...prev }
        if (next[id]) {
          delete next[id].phone
        }
        return next
      })
    }
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
    if (details.schoolName?.trim()) {
      setErrors((prev) => {
        const next = { ...prev }
        if (next[id]) {
          delete next[id].schoolName
        }
        return next
      })
    }
    if (details.grade) {
      setErrors((prev) => {
        const next = { ...prev }
        if (next[id]) {
          delete next[id].grade
        }
        return next
      })
    }
    if (details.university?.trim()) {
      setErrors((prev) => {
        const next = { ...prev }
        if (next[id]) {
          delete next[id].university
        }
        return next
      })
    }
    if (details.faculty?.trim()) {
      setErrors((prev) => {
        const next = { ...prev }
        if (next[id]) {
          delete next[id].faculty
        }
        return next
      })
    }
    if (details.studentId?.trim()) {
      setErrors((prev) => {
        const next = { ...prev }
        if (next[id]) {
          delete next[id].studentId
        }
        return next
      })
    }
  }

  const validateThaiPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length !== phone.length) return false
    return /^0[689]\d{8}$/.test(cleaned)
  }

  const validateMemberField = (id: string, field: string, value: any) => {
    let error: string | undefined
    switch (field) {
      case 'name':
        if (!value.trim()) error = 'Name is required'
        break
      case 'phone':
        if (!value.trim()) {
          error = 'Phone is required'
        } else if (!validateThaiPhone(value)) {
          error = 'Invalid Thai phone number'
        }
        break
      case 'schoolName':
        if (!value.trim()) error = 'School name is required'
        break
      case 'grade':
        if (!value) error = 'Grade is required'
        break
      case 'university':
        if (!value.trim()) error = 'University is required'
        break
      case 'faculty':
        if (!value.trim()) error = 'Faculty is required'
        break
      case 'studentId':
        if (!value.trim()) error = 'Student ID is required'
        break
    }
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: error },
      }))
    }
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
          <h3 className="text-lg font-semibold text-white">Team Members</h3>
          <p className="text-sm text-slate-400">
            Add 2-4 members (team will have 3-5 people including you)
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addMember}
          disabled={members.length >= 4}
          className="border-slate-500 bg-slate-700 text-white hover:bg-slate-600 hover:text-aiih-secondary"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Member
        </Button>
      </div>

      {members.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-xl">
          <User className="h-12 w-12 mx-auto text-slate-600 mb-3" />
          <p className="text-slate-400 mb-2">No team members added yet</p>
          <p className="text-sm text-slate-500">
            Click "Add Member" to add your first member
          </p>
        </div>
      )}

      <div className="space-y-4">
        {members.map((member, index) => (
          <div
            key={member.id}
            className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-aiih-secondary/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-aiih-secondary">
                    {index + 1}
                  </span>
                </div>
                <span className="font-medium text-white">
                  Member {index + 1}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeMember(member.id)}
                className="text-slate-500 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name <span className="text-aiih-secondary">*</span>
                </label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) =>
                    updateMember(member.id, 'name', e.target.value)
                  }
                  onBlur={() =>
                    validateMemberField(member.id, 'name', member.name)
                  }
                  placeholder="Thai and English name"
                  className={cn(
                    'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                    'transition-all duration-200',
                    errors[member.id]?.name
                      ? 'border-red-500/50 focus-visible:ring-red-500'
                      : 'border-slate-700 hover:border-slate-600',
                  )}
                />
                {errors[member.id]?.name && (
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
                    {errors[member.id].name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone <span className="text-aiih-secondary">*</span>
                </label>
                <input
                  type="tel"
                  value={member.phone}
                  onChange={(e) =>
                    updateMember(member.id, 'phone', e.target.value)
                  }
                  onBlur={() =>
                    validateMemberField(member.id, 'phone', member.phone)
                  }
                  placeholder="0xx-xxx-xxxx"
                  className={cn(
                    'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                    'transition-all duration-200',
                    errors[member.id]?.phone
                      ? 'border-red-500/50 focus-visible:ring-red-500'
                      : 'border-slate-700 hover:border-slate-600',
                  )}
                />
                {errors[member.id]?.phone && (
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
                    {errors[member.id].phone}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-200">
                Education Level <span className="text-aiih-secondary">*</span>
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                <div
                  onClick={() => {
                    updateMember(member.id, 'educationType', 'high_school')
                    updateMemberEducation(member.id, { type: 'high_school' })
                  }}
                  className={cn(
                    'cursor-pointer rounded-lg border-2 p-3 transition-all duration-300',
                    'hover:scale-[1.02]',
                    member.educationType === 'high_school'
                      ? 'border-aiih-secondary bg-aiih-secondary/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center',
                        member.educationType === 'high_school'
                          ? 'bg-aiih-secondary text-aiih-primary'
                          : 'bg-slate-700 text-slate-300',
                      )}
                    >
                      <School className="w-4 h-4" />
                    </div>
                    <div className="font-medium text-sm text-white">
                      High School
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    updateMember(member.id, 'educationType', 'university')
                    updateMemberEducation(member.id, { type: 'university' })
                  }}
                  className={cn(
                    'cursor-pointer rounded-lg border-2 p-3 transition-all duration-300',
                    'hover:scale-[1.02]',
                    member.educationType === 'university'
                      ? 'border-aiih-secondary bg-aiih-secondary/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center',
                        member.educationType === 'university'
                          ? 'bg-aiih-secondary text-aiih-primary'
                          : 'bg-slate-700 text-slate-300',
                      )}
                    >
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="font-medium text-sm text-white">
                      University
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {member.educationType === 'high_school' ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-200">
                    School Name <span className="text-aiih-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    value={member.educationDetails.schoolName || ''}
                    onChange={(e) =>
                      updateMemberEducation(member.id, {
                        ...member.educationDetails,
                        schoolName: e.target.value,
                      })
                    }
                    onBlur={() =>
                      validateMemberField(
                        member.id,
                        'schoolName',
                        member.educationDetails.schoolName,
                      )
                    }
                    placeholder="School name"
                    className={cn(
                      'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                      'transition-all duration-200',
                      errors[member.id]?.schoolName
                        ? 'border-red-500/50 focus-visible:ring-red-500'
                        : 'border-slate-700 hover:border-slate-600',
                    )}
                  />
                  {errors[member.id]?.schoolName && (
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
                      {errors[member.id].schoolName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-200">
                    Grade <span className="text-aiih-secondary">*</span>
                  </label>
                  <select
                    value={member.educationDetails.grade || ''}
                    onChange={(e) =>
                      updateMemberEducation(member.id, {
                        ...member.educationDetails,
                        grade: e.target.value,
                      })
                    }
                    onBlur={() =>
                      validateMemberField(
                        member.id,
                        'grade',
                        member.educationDetails.grade,
                      )
                    }
                    className={cn(
                      'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                      'transition-all duration-200',
                      errors[member.id]?.grade
                        ? 'border-red-500/50 focus-visible:ring-red-500'
                        : 'border-slate-700 hover:border-slate-600',
                    )}
                  >
                    <option value="" className="bg-slate-800">
                      Select grade
                    </option>
                    <option value="M.4" className="bg-slate-800">
                      M.4
                    </option>
                    <option value="M.5" className="bg-slate-800">
                      M.5
                    </option>
                    <option value="M.6" className="bg-slate-800">
                      M.6
                    </option>
                  </select>
                  {errors[member.id]?.grade && (
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
                      {errors[member.id].grade}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-200">
                    University <span className="text-aiih-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    value={member.educationDetails.university || ''}
                    onChange={(e) =>
                      updateMemberEducation(member.id, {
                        ...member.educationDetails,
                        university: e.target.value,
                      })
                    }
                    onBlur={() =>
                      validateMemberField(
                        member.id,
                        'university',
                        member.educationDetails.university,
                      )
                    }
                    placeholder="University"
                    className={cn(
                      'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                      'transition-all duration-200',
                      errors[member.id]?.university
                        ? 'border-red-500/50 focus-visible:ring-red-500'
                        : 'border-slate-700 hover:border-slate-600',
                    )}
                  />
                  {errors[member.id]?.university && (
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
                      {errors[member.id].university}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-200">
                    Faculty <span className="text-aiih-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    value={member.educationDetails.faculty || ''}
                    onChange={(e) =>
                      updateMemberEducation(member.id, {
                        ...member.educationDetails,
                        faculty: e.target.value,
                      })
                    }
                    onBlur={() =>
                      validateMemberField(
                        member.id,
                        'faculty',
                        member.educationDetails.faculty,
                      )
                    }
                    placeholder="Faculty"
                    className={cn(
                      'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                      'transition-all duration-200',
                      errors[member.id]?.faculty
                        ? 'border-red-500/50 focus-visible:ring-red-500'
                        : 'border-slate-700 hover:border-slate-600',
                    )}
                  />
                  {errors[member.id]?.faculty && (
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
                      {errors[member.id].faculty}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-200">
                    Student ID <span className="text-aiih-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    value={member.educationDetails.studentId || ''}
                    onChange={(e) =>
                      updateMemberEducation(member.id, {
                        ...member.educationDetails,
                        studentId: e.target.value,
                      })
                    }
                    onBlur={() =>
                      validateMemberField(
                        member.id,
                        'studentId',
                        member.educationDetails.studentId,
                      )
                    }
                    placeholder="Student ID"
                    className={cn(
                      'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                      'transition-all duration-200',
                      errors[member.id]?.studentId
                        ? 'border-red-500/50 focus-visible:ring-red-500'
                        : 'border-slate-700 hover:border-slate-600',
                    )}
                  />
                  {errors[member.id]?.studentId && (
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
        <RegistrationBackButton onClick={onBack} />
        <RegistrationContinueButton type="submit" />
      </div>
    </form>
  )
}
