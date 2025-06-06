import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'default' | 'destructive' | 'warning' | 'success'
  children: React.ReactNode
}

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <div
      className={cn(
        'mb-1 w-fit rounded-md bg-blue-200 px-2 py-1 text-blue-700',
        variant === 'destructive' && 'bg-red-200 text-red-700',
        variant === 'warning' && 'bg-yellow-200 text-yellow-700',
        variant === 'success' && 'bg-green-200 text-green-700'
      )}
    >
      <p className="text-xs font-semibold">{children}</p>
    </div>
  )
}
