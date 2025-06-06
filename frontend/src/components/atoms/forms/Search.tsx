import * as React from 'react'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

import { cn } from '@/lib/utils'
import { Input, InputProps } from '@/components/ui/input'

interface SearchProps extends InputProps {
  containerClassName?: string
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(({ className, containerClassName, ...props }, ref) => {
  return (
    <div className={cn('relative', containerClassName)}>
      <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 transform text-lg text-black/40" />
      <Input
        {...props}
        ref={ref}
        className={cn(
          'rounded-lg border-none bg-black/5 py-6 pl-12 pr-4 outline-none placeholder:text-sm placeholder:text-[#8897AD] placeholder:text-black/40 focus-visible:ring-0 focus-visible:ring-offset-0',
          className
        )}
      />
    </div>
  )
})

export default Search
