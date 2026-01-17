'use client'

import { useState } from 'react'
import { BookOpen, Camera, CheckCircle2, Database } from 'lucide-react'
import { RegistrationBackButton } from './RegistrationBackButton'
import { RegistrationContinueButton } from './RegistrationContinueButton'

interface StepConsentProps {
  onNext: (consent: { rules: boolean; photo: boolean; data: boolean }) => void
  onBack: () => void
}

export function StepConsent({ onNext, onBack }: StepConsentProps) {
  const [consent, setConsent] = useState({
    rules: false,
    photo: false,
    data: false,
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent.rules || !consent.photo || !consent.data) {
      setError('Please accept all terms to continue')
      return
    }
    onNext(consent)
  }

  const consentItems = [
    {
      key: 'rules' as const,
      icon: BookOpen,
      title: 'Competition Rules',
      description:
        'I agree to the competition rules and timeline. I understand that my team must submit our project by the deadline and present at Demo Day on March 7, 2026.',
    },
    {
      key: 'photo' as const,
      icon: Camera,
      title: 'Photo & Video Consent',
      description:
        'I consent to photo and video capture during the event for promotional purposes by Kasetsart University and the organizers.',
    },
    {
      key: 'data' as const,
      icon: Database,
      title: 'Data Processing',
      description:
        'I allow my personal data to be used for registration purposes and to contact me regarding the competition.',
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Consent & Agreements
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          Please review and accept the following terms to complete your
          registration.
        </p>

        <div className="space-y-4">
          {consentItems.map((item) => {
            const Icon = item.icon
            const isChecked = consent[item.key]
            return (
              <label
                key={item.key}
                className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  isChecked
                    ? 'border-aiih-secondary bg-aiih-secondary/10'
                    : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                }`}
              >
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      setConsent({ ...consent, [item.key]: e.target.checked })
                      if (consent.rules && consent.photo && consent.data) {
                        setError('')
                      }
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                      isChecked
                        ? 'bg-aiih-secondary border-aiih-secondary'
                        : 'border-slate-600 bg-slate-800'
                    }`}
                  >
                    {isChecked && (
                      <CheckCircle2 className="w-4 h-4 text-aiih-primary" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isChecked ? 'bg-aiih-secondary/20' : 'bg-slate-700'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isChecked ? 'text-aiih-secondary' : 'text-slate-400'
                        }`}
                      />
                    </div>
                    <span className="font-medium text-white">{item.title}</span>
                  </div>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </div>
              </label>
            )
          })}
        </div>

        {error && (
          <p className="text-sm text-red-400 flex items-center gap-2 mt-4">
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
            {error}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <RegistrationBackButton onClick={onBack} />
        <RegistrationContinueButton type="submit">
          Review & Submit
        </RegistrationContinueButton>
      </div>
    </form>
  )
}
