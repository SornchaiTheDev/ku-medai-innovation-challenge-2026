import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RegistrationContinueButtonProps {
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  disabled?: boolean
  isLoading?: boolean
  children?: React.ReactNode
}

export function RegistrationContinueButton({
  onClick,
  type = 'button',
  className,
  disabled,
  isLoading,
  children = 'Continue',
}: RegistrationContinueButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'flex-1 h-11 bg-aiih-secondary text-aiih-primary font-semibold rounded-lg hover:bg-aiih-secondary/90 transition-all duration-200 cursor-pointer',
        className,
      )}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </Button>
  )
}
