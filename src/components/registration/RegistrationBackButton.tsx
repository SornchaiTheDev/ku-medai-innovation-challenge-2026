import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RegistrationBackButtonProps {
  onClick: () => void
  className?: string
  disabled?: boolean
}

export function RegistrationBackButton({
  onClick,
  className,
  disabled,
}: RegistrationBackButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex-1 h-11 border-slate-500 bg-slate-700 text-white hover:bg-slate-600 hover:text-white transition-all duration-200 cursor-pointer',
        className,
      )}
    >
      Back
    </Button>
  )
}
