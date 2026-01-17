'use client'

import { cn } from '@/lib/utils'

interface FormFieldProps {
  label: string
  htmlFor?: string
  icon?: React.ReactNode
  error?: string
  required?: boolean
  children: React.ReactNode
}

export function FormField({
  label,
  htmlFor,
  icon,
  error,
  required,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className={cn(
          'text-sm font-semibold text-slate-200 flex items-center gap-2 mb-3',
        )}
      >
        {icon}
        {label}
        {required && <span className="text-aiih-secondary">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
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
  )
}
