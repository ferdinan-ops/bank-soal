import {
  HiEllipsisHorizontal,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineCog6Tooth,
  HiOutlinePencilSquare,
  HiOutlineTrash
} from 'react-icons/hi2'
import { IconType } from 'react-icons'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

interface MoreProps {
  children: React.ReactNode
  type?: 'more' | 'settings'
}

export default function More({ children, type = 'more' }: MoreProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {type === 'settings' ? (
          <Button variant="outline" size="icon">
            <HiOutlineCog6Tooth className="text-xl" />
          </Button>
        ) : (
          <Button size="icon" variant="outline" className="h-6 w-6 p-0">
            <HiEllipsisHorizontal />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ItemProps {
  label?: string
  icon?: IconType
  type?: 'edit' | 'delete' | 'default' | 'detail'
  onClick?: () => void
}

const labelType = (type: 'edit' | 'delete' | 'default' | 'detail') => {
  switch (type) {
    case 'edit':
      return 'Ubah data'
    case 'delete':
      return 'Hapus data'
    case 'default':
      return 'Lihat data'
    case 'detail':
      return 'Lihat detail'
  }
}

function Item({ label, type = 'default', icon: Icon, onClick }: ItemProps) {
  return (
    <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5" onClick={onClick}>
      {type === 'edit' && <HiOutlinePencilSquare className="text-lg" />}
      {type === 'delete' && <HiOutlineTrash className="text-lg text-red-500" />}
      {type === 'detail' && <HiOutlineArrowTopRightOnSquare className="text-lg" />}
      {type === 'default' && Icon && <Icon className="text-lg" />}
      <p className={cn('text-xs font-medium', type === 'delete' && 'text-red-500')}>{label ?? labelType(type)}</p>
    </DropdownMenuItem>
  )
}

More.Item = Item
