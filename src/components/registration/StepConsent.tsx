'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Consent & Agreements</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Please review and accept the following terms to complete your
          registration.
        </p>

        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent.rules}
              onChange={(e) =>
                setConsent({ ...consent, rules: e.target.checked })
              }
              className="mt-1 h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm">
              I agree to the competition rules and timeline. I understand that
              my team must submit our project by the deadline and present at
              Demo Day on March 7, 2026.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent.photo}
              onChange={(e) =>
                setConsent({ ...consent, photo: e.target.checked })
              }
              className="mt-1 h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm">
              I consent to photo and video capture during the event for
              promotional purposes by Kasetsart University and the organizers.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent.data}
              onChange={(e) =>
                setConsent({ ...consent, data: e.target.checked })
              }
              className="mt-1 h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm">
              I allow my personal data to be used for registration purposes and
              to contact me regarding the competition.
            </span>
          </label>
        </div>

        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
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
          Review & Submit
        </Button>
      </div>
    </form>
  )
}
