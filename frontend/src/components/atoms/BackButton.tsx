import { HiArrowLeft } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface BackButtonProps {
  className?: string
  action?: () => void
}

export default function BackButton({ className, action }: BackButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    action && action()
    navigate(-1)
  }

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      className={cn('mb-5 flex w-fit items-center gap-2 p-0 px-3.5 lg:px-4 lg:py-2', className)}
    >
      <HiArrowLeft className="text-sm lg:text-base" />
      <span className="hidden text-xs font-semibold lg:flex">Kembali</span>
    </Button>
  )
}
