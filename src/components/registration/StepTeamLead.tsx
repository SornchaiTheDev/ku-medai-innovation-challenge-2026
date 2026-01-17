'use client'

import { useState } from 'react'
import { GraduationCap, Phone, School } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RegistrationBackButton } from './RegistrationBackButton'
import { RegistrationContinueButton } from './RegistrationContinueButton'

interface EducationDetails {
  type: 'high_school' | 'university'
  schoolName?: string
  grade?: string
  university?: string
  faculty?: string
  studentId?: string
}

interface StepTeamLeadProps {
  user: { name: string; email: string; image?: string | null }
  onNext: (data: {
    phone: string
    educationType: 'high_school' | 'university'
    educationDetails: EducationDetails
  }) => void
  onBack: () => void
  initialData?: {
    phone: string
    educationType: 'high_school' | 'university'
    educationDetails: EducationDetails
  }
}

export function StepTeamLead({
  user,
  onNext,
  onBack,
  initialData,
}: StepTeamLeadProps) {
  const [phone, setPhone] = useState(initialData?.phone || '')
  const [educationType, setEducationType] = useState<
    'high_school' | 'university'
  >(initialData?.educationType || 'university')
  const [educationDetails, setEducationDetails] = useState<EducationDetails>(
    initialData?.educationDetails || { type: 'university' },
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateThaiPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length >= 9 && cleaned.length <= 10
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validateThaiPhone(phone)) {
      newErrors.phone = 'Please enter a valid Thai phone number'
    }

    if (educationType === 'high_school') {
      if (!educationDetails.schoolName?.trim()) {
        newErrors.schoolName = 'School name is required'
      }
      if (!educationDetails.grade) {
        newErrors.grade = 'Grade is required'
      }
    } else {
      if (!educationDetails.university?.trim()) {
        newErrors.university = 'University name is required'
      }
      if (!educationDetails.faculty?.trim()) {
        newErrors.faculty = 'Faculty is required'
      }
      if (!educationDetails.studentId?.trim()) {
        newErrors.studentId = 'Student ID is required'
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onNext({ phone, educationType, educationDetails })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
        {user.image && (
          <img
            src={user.image}
            alt={user.name}
            className="h-12 w-12 rounded-full border-2 border-aiih-secondary"
          />
        )}
        <div>
          <div className="font-semibold text-white">{user.name}</div>
          <div className="text-sm text-slate-400">{user.email}</div>
        </div>
        <div className="ml-auto px-3 py-1 rounded-full bg-aiih-secondary/10 text-aiih-secondary text-xs font-medium">
          Team Lead
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="text-sm font-semibold text-slate-200 flex items-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Phone Number <span className="text-aiih-secondary">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0xx-xxx-xxxx"
          className={cn(
            'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
            'transition-all duration-200',
            errors.phone
              ? 'border-red-500/50 focus-visible:ring-red-500'
              : 'border-slate-700 hover:border-slate-600',
          )}
        />
        {errors.phone && (
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
            {errors.phone}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-200">
          Education Level <span className="text-aiih-secondary">*</span>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <div
            onClick={() => {
              setEducationType('high_school')
              setEducationDetails({ type: 'high_school' })
            }}
            className={cn(
              'cursor-pointer rounded-xl border-2 p-4 transition-all duration-300',
              'hover:scale-[1.02]',
              educationType === 'high_school'
                ? 'border-aiih-secondary bg-aiih-secondary/10'
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600',
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  educationType === 'high_school'
                    ? 'bg-aiih-secondary text-aiih-primary'
                    : 'bg-slate-700 text-slate-300',
                )}
              >
                <School className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-white">High School</div>
                <div className="text-xs text-slate-400">M.4 - M.6</div>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setEducationType('university')
              setEducationDetails({ type: 'university' })
            }}
            className={cn(
              'cursor-pointer rounded-xl border-2 p-4 transition-all duration-300',
              'hover:scale-[1.02]',
              educationType === 'university'
                ? 'border-aiih-secondary bg-aiih-secondary/10'
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600',
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  educationType === 'university'
                    ? 'bg-aiih-secondary text-aiih-primary'
                    : 'bg-slate-700 text-slate-300',
                )}
              >
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-white">University</div>
                <div className="text-xs text-slate-400">Undergraduate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {educationType === 'high_school' ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="schoolName"
              className="text-sm font-semibold text-slate-200"
            >
              School Name <span className="text-aiih-secondary">*</span>
            </label>
            <input
              id="schoolName"
              type="text"
              value={educationDetails.schoolName || ''}
              onChange={(e) =>
                setEducationDetails({
                  ...educationDetails,
                  schoolName: e.target.value,
                })
              }
              placeholder="Enter your school name"
              className={cn(
                'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                'transition-all duration-200',
                errors.schoolName
                  ? 'border-red-500/50 focus-visible:ring-red-500'
                  : 'border-slate-700 hover:border-slate-600',
              )}
            />
            {errors.schoolName && (
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
                {errors.schoolName}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="grade"
              className="text-sm font-semibold text-slate-200"
            >
              Grade <span className="text-aiih-secondary">*</span>
            </label>
            <select
              id="grade"
              value={educationDetails.grade || ''}
              onChange={(e) =>
                setEducationDetails({
                  ...educationDetails,
                  grade: e.target.value,
                })
              }
              className={cn(
                'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                'transition-all duration-200',
                errors.grade
                  ? 'border-red-500/50 focus-visible:ring-red-500'
                  : 'border-slate-700 hover:border-slate-600',
              )}
            >
              <option value="" className="bg-slate-800">
                Select grade
              </option>
              <option value="M.4" className="bg-slate-800">
                M.4 (Grade 10)
              </option>
              <option value="M.5" className="bg-slate-800">
                M.5 (Grade 11)
              </option>
              <option value="M.6" className="bg-slate-800">
                M.6 (Grade 12)
              </option>
            </select>
            {errors.grade && (
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
                {errors.grade}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="university"
              className="text-sm font-semibold text-slate-200"
            >
              University <span className="text-aiih-secondary">*</span>
            </label>
            <input
              id="university"
              type="text"
              value={educationDetails.university || ''}
              onChange={(e) =>
                setEducationDetails({
                  ...educationDetails,
                  university: e.target.value,
                })
              }
              placeholder="Enter your university name"
              className={cn(
                'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                'transition-all duration-200',
                errors.university
                  ? 'border-red-500/50 focus-visible:ring-red-500'
                  : 'border-slate-700 hover:border-slate-600',
              )}
            />
            {errors.university && (
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
                {errors.university}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="faculty"
              className="text-sm font-semibold text-slate-200"
            >
              Faculty <span className="text-aiih-secondary">*</span>
            </label>
            <input
              id="faculty"
              type="text"
              value={educationDetails.faculty || ''}
              onChange={(e) =>
                setEducationDetails({
                  ...educationDetails,
                  faculty: e.target.value,
                })
              }
              placeholder="Enter your faculty"
              className={cn(
                'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                'transition-all duration-200',
                errors.faculty
                  ? 'border-red-500/50 focus-visible:ring-red-500'
                  : 'border-slate-700 hover:border-slate-600',
              )}
            />
            {errors.faculty && (
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
                {errors.faculty}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="studentId"
              className="text-sm font-semibold text-slate-200"
            >
              Student ID <span className="text-aiih-secondary">*</span>
            </label>
            <input
              id="studentId"
              type="text"
              value={educationDetails.studentId || ''}
              onChange={(e) =>
                setEducationDetails({
                  ...educationDetails,
                  studentId: e.target.value,
                })
              }
              placeholder="Enter your student ID"
              className={cn(
                'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                'transition-all duration-200',
                errors.studentId
                  ? 'border-red-500/50 focus-visible:ring-red-500'
                  : 'border-slate-700 hover:border-slate-600',
              )}
            />
            {errors.studentId && (
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
                {errors.studentId}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <RegistrationBackButton onClick={onBack} />
        <RegistrationContinueButton type="submit" />
      </div>
    </form>
  )
}
