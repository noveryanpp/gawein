import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none backdrop-blur-sm',
          {

            'bg-gradient-to-r from-[#1E90FF] to-[#0057B8] text-white hover:from-[#0057B8] hover:to-blue-800 shadow-lg hover:shadow-xl focus:ring-[#1E90FF]/50':
              variant === 'primary',
            'bg-[#FAFAFA] text-[#0057B8] ring ring-inset ring-[#E6F2FF] hover:bg-[#E6F2FF] shadow-md hover:shadow-lg focus:ring-[#1E90FF]/30':
              variant === 'secondary',
            'ring-2 ring-inset ring-[#1E90FF] text-[#1E90FF] bg-transparent hover:bg-[#1E90FF] hover:text-white focus:ring-[#1E90FF]/50':
              variant === 'outline',
          },
          {

            'px-4 py-2 text-sm min-h-[36px]': size === 'sm',
            'px-6 py-3 text-base min-h-[44px]': size === 'md',
            'px-8 py-4 text-lg min-h-[52px]': size === 'lg',
          },
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
