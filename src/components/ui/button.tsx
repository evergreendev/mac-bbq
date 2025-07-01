import { cn } from 'src/utilities/cn'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex rounded items-center justify-center whitespace-nowrap text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-11 px-8',
        sm: 'h-9 px-3',
        full: 'w-full'
      },
      variant: {
        default: 'border border-border bg-transparent hover:bg-card hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline: 'border border-border bg-transparent hover:bg-card hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        highlight: 'bg-brand-accent-500 text-white hover:bg-brand-accent-600 hover:border hover:border-white no-underline',
        gold: 'bg-brand-accent-500 text-brand-neutral-800 hover:bg-brand-accent-600 hover:border hover:border-white',
        full: 'text-white hover:bg-brand-primary-600 w-full border-0 text-xl flex font-normal bg-brand-primary-500 py-3 px-4 pl-16 text-left justify-start',
        fullOrange: 'text-white hover:bg-brand-primary-600 w-full border-0 text-xl flex font-normal bg-brand-primary-500 py-3 px-4 pl-16 text-left justify-start'
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
