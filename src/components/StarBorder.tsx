import React from 'react'

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T
    className?: string
    children?: React.ReactNode
    color?: string
    speed?: React.CSSProperties['animationDuration']
    thickness?: number
    variant?: 'dark' | 'emerald'
  }

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  variant = 'dark',
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button'

  const backgroundStyles = {
    dark: 'from-black to-gray-900',
    emerald: 'from-emerald-600 to-emerald-800',
  }

  const borderStyles = {
    dark: 'border-gray-800',
    emerald: 'border-emerald-400',
  }

  const textStyles = {
    dark: 'text-white',
    emerald: 'text-white',
  }

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-full ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as any).style,
      }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={`relative z-1 bg-gradient-to-b ${backgroundStyles[variant]} ${borderStyles[variant]} border text-center font-semibold rounded-full`}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.125rem',
          lineHeight: '1.25rem',
        }}
      >
        <span className={textStyles[variant]}>{children}</span>
      </div>
    </Component>
  )
}

export default StarBorder
