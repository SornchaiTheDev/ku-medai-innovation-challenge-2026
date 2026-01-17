'use client'

import { useState } from 'react'
import { GraduationCap, Phone, Plus, School, Trash2, User } from 'lucide-react'
import { InputField } from './InputField'
import { SelectField } from './SelectField'
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
              <InputField
                label="Full Name"
                icon={<User className="w-4 h-4" />}
                required
                value={member.name}
                onChange={(e) =>
                  updateMember(member.id, 'name', e.target.value)
                }
                onBlur={() =>
                  validateMemberField(member.id, 'name', member.name)
                }
                placeholder="Thai and English name"
                error={errors[member.id]?.name}
              />
              <InputField
                label="Phone"
                icon={<Phone className="w-4 h-4" />}
                required
                type="tel"
                value={member.phone}
                onChange={(e) =>
                  updateMember(member.id, 'phone', e.target.value)
                }
                onBlur={() =>
                  validateMemberField(member.id, 'phone', member.phone)
                }
                placeholder="0xx-xxx-xxxx"
                error={errors[member.id]?.phone}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-200 block mb-3">
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
                <InputField
                  label="School Name"
                  required
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
                  error={errors[member.id]?.schoolName}
                />
                <SelectField
                  label="Grade"
                  required
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
                  error={errors[member.id]?.grade}
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
                </SelectField>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-3">
                <InputField
                  label="University"
                  required
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
                  error={errors[member.id]?.university}
                />
                <InputField
                  label="Faculty"
                  required
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
                  error={errors[member.id]?.faculty}
                />
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
