'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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
  initialData?: {
    phone: string
    educationType: 'high_school' | 'university'
    educationDetails: EducationDetails
  }
}

export function StepTeamLead({ user, onNext, initialData }: StepTeamLeadProps) {
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
      <div className="flex items-center gap-4 rounded-lg border p-4">
        {user.image && (
          <img
            src={user.image}
            alt={user.name}
            className="h-12 w-12 rounded-full"
          />
        )}
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium leading-none">
          Phone Number (Thai) *
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0xx-xxx-xxxx"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium leading-none">
          Education Level *
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <div
            onClick={() => {
              setEducationType('high_school')
              setEducationDetails({ type: 'high_school' })
            }}
            className={cn(
              'cursor-pointer rounded-lg border-2 p-4 transition-all',
              educationType === 'high_school'
                ? 'border-primary bg-accent'
                : 'border-border',
            )}
          >
            <div className="font-medium">High School</div>
            <div className="text-xs text-muted-foreground">M.4 - M.6</div>
          </div>
          <div
            onClick={() => {
              setEducationType('university')
              setEducationDetails({ type: 'university' })
            }}
            className={cn(
              'cursor-pointer rounded-lg border-2 p-4 transition-all',
              educationType === 'university'
                ? 'border-primary bg-accent'
                : 'border-border',
            )}
          >
            <div className="font-medium">University</div>
            <div className="text-xs text-muted-foreground">Undergraduate</div>
          </div>
        </div>
      </div>

      {educationType === 'high_school' ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="schoolName"
              className="text-sm font-medium leading-none"
            >
              School Name *
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.schoolName && (
              <p className="text-sm text-red-500">{errors.schoolName}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="grade" className="text-sm font-medium leading-none">
              Grade *
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select grade</option>
              <option value="M.4">M.4 (Grade 10)</option>
              <option value="M.5">M.5 (Grade 11)</option>
              <option value="M.6">M.6 (Grade 12)</option>
            </select>
            {errors.grade && (
              <p className="text-sm text-red-500">{errors.grade}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="university"
              className="text-sm font-medium leading-none"
            >
              University *
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.university && (
              <p className="text-sm text-red-500">{errors.university}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="faculty"
              className="text-sm font-medium leading-none"
            >
              Faculty *
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.faculty && (
              <p className="text-sm text-red-500">{errors.faculty}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="studentId"
              className="text-sm font-medium leading-none"
            >
              Student ID *
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.studentId && (
              <p className="text-sm text-red-500">{errors.studentId}</p>
            )}
          </div>
        </div>
      )}

      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  )
}
