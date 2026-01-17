'use client'

import { useState } from 'react'
import { GraduationCap, Phone, School, User } from 'lucide-react'
import { InputField } from './InputField'
import { SelectField } from './SelectField'
import { RegistrationBackButton } from './RegistrationBackButton'
import { RegistrationContinueButton } from './RegistrationContinueButton'
import { cn } from '@/lib/utils'

interface EducationDetails {
  type: 'high_school' | 'university'
  schoolName?: string
  grade?: string
  university?: string
  faculty?: string
}

interface StepTeamLeadProps {
  user: { name: string; email: string; image?: string | null }
  onNext: (data: {
    fullName: string
    phone: string
    educationType: 'high_school' | 'university'
    educationDetails: EducationDetails
  }) => void
  onBack: () => void
  initialData?: {
    fullName: string
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
  const [fullName, setFullName] = useState(initialData?.fullName || user.name)
  const [phone, setPhone] = useState(initialData?.phone || '')
  const [educationType, setEducationType] = useState<
    'high_school' | 'university'
  >(initialData?.educationType || 'university')
  const [educationDetails, setEducationDetails] = useState<EducationDetails>(
    initialData?.educationDetails || { type: 'university' },
  )
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})

  const validateThaiPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length !== phone.length) return false
    return /^0[689]\d{8}$/.test(cleaned)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

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
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onNext({ fullName, phone, educationType, educationDetails })
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

      <InputField
        label="Full Name"
        htmlFor="fullName"
        icon={<User className="w-4 h-4" />}
        required
        value={fullName}
        onChange={(e) => {
          setFullName(e.target.value)
          if (e.target.value.trim()) {
            setErrors((prev) => {
              const next = { ...prev }
              delete next.fullName
              return next
            })
          }
        }}
        onBlur={() => {
          if (!fullName.trim()) {
            setErrors((prev) => ({
              ...prev,
              fullName: 'Full name is required',
            }))
          }
        }}
        placeholder="Thai and English name"
        error={errors.fullName}
      />

      <InputField
        label="Phone Number"
        htmlFor="phone"
        icon={<Phone className="w-4 h-4" />}
        required
        type="tel"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value)
          if (e.target.value.trim() && validateThaiPhone(e.target.value)) {
            setErrors((prev) => {
              const next = { ...prev }
              delete next.phone
              return next
            })
          }
        }}
        onBlur={() => {
          if (phone.trim() && !validateThaiPhone(phone)) {
            setErrors((prev) => ({
              ...prev,
              phone: 'Please enter a valid Thai phone number',
            }))
          } else if (!phone.trim()) {
            setErrors((prev) => ({
              ...prev,
              phone: 'Phone number is required',
            }))
          }
        }}
        placeholder="0xx-xxx-xxxx"
        error={errors.phone}
      />

      <div>
        <label className="text-sm font-semibold text-slate-200 block mb-3">
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
        <div className="space-y-5">
          <InputField
            label="School Name"
            htmlFor="schoolName"
            required
            value={educationDetails.schoolName || ''}
            onChange={(e) => {
              setEducationDetails({
                ...educationDetails,
                schoolName: e.target.value,
              })
              if (e.target.value.trim()) {
                setErrors((prev) => {
                  const next = { ...prev }
                  delete next.schoolName
                  return next
                })
              }
            }}
            onBlur={() => {
              if (!educationDetails.schoolName?.trim()) {
                setErrors((prev) => ({
                  ...prev,
                  schoolName: 'School name is required',
                }))
              }
            }}
            placeholder="Enter your school name"
            error={errors.schoolName}
          />
          <SelectField
            label="Grade"
            htmlFor="grade"
            required
            value={educationDetails.grade || ''}
            onChange={(e) => {
              setEducationDetails({
                ...educationDetails,
                grade: e.target.value,
              })
              if (e.target.value) {
                setErrors((prev) => {
                  const next = { ...prev }
                  delete next.grade
                  return next
                })
              }
            }}
            onBlur={() => {
              if (!educationDetails.grade) {
                setErrors((prev) => ({
                  ...prev,
                  grade: 'Grade is required',
                }))
              }
            }}
            error={errors.grade}
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
          </SelectField>
        </div>
      ) : (
        <div className="space-y-5">
          <InputField
            label="University"
            htmlFor="university"
            required
            value={educationDetails.university || ''}
            onChange={(e) => {
              setEducationDetails({
                ...educationDetails,
                university: e.target.value,
              })
              if (e.target.value.trim()) {
                setErrors((prev) => {
                  const next = { ...prev }
                  delete next.university
                  return next
                })
              }
            }}
            onBlur={() => {
              if (!educationDetails.university?.trim()) {
                setErrors((prev) => ({
                  ...prev,
                  university: 'University name is required',
                }))
              }
            }}
            placeholder="Enter your university name"
            error={errors.university}
          />
          <InputField
            label="Faculty"
            htmlFor="faculty"
            required
            value={educationDetails.faculty || ''}
            onChange={(e) => {
              setEducationDetails({
                ...educationDetails,
                faculty: e.target.value,
              })
              if (e.target.value.trim()) {
                setErrors((prev) => {
                  const next = { ...prev }
                  delete next.faculty
                  return next
                })
              }
            }}
            onBlur={() => {
              if (!educationDetails.faculty?.trim()) {
                setErrors((prev) => ({
                  ...prev,
                  faculty: 'Faculty is required',
                }))
              }
            }}
            placeholder="Enter your faculty"
            error={errors.faculty}
          />
        </div>
      )}

      <div className="flex gap-4">
        <RegistrationBackButton onClick={onBack} />
        <RegistrationContinueButton type="submit" />
      </div>
    </form>
  )
}
