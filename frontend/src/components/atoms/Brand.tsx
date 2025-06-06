import { Link } from 'react-router-dom'

import { Logo } from '@/assets'
import { cn } from '@/lib/utils'

interface BrandProps {
  className?: string
  imageClassName?: string
  href?: string
}

export default function Brand({ className, imageClassName, href }: BrandProps) {
  return (
    <Link to={href ?? '/'} className={cn('flex items-center gap-2.5 font-bold', className)}>
      <img src={Logo} alt="logo" className={cn('w-6', imageClassName)} />
      <div className="flex flex-col gap-0">
        <span className="-mb-2">BANK SOAL</span>
        <span className="text-[13px] font-semibold text-primary/80">SMK NEGERI 1 PAKKAT</span>
      </div>
    </Link>
  )
}
