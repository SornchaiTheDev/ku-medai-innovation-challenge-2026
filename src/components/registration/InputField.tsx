'use client'

import { cn } from '@/lib/utils'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  htmlFor?: string
  icon?: React.ReactNode
  error?: string
  required?: boolean
}

export function InputField({
  label,
  htmlFor,
  icon,
  error,
  required,
  className,
  ...props
}: InputFieldProps) {
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
      <input
        id={htmlFor}
        className={cn(
          'flex h-11 w-full rounded-lg border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiih-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
          'transition-all duration-200',
          error
            ? 'border-red-500/50 focus-visible:ring-red-500'
            : 'border-slate-700 hover:border-slate-600',
          className,
        )}
        {...props}
      />
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
