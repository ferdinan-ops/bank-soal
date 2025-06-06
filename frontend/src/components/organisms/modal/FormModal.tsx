import * as React from 'react'
import { HiPlus } from 'react-icons/hi2'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

interface FormModalProps {
  children: React.ReactNode
  title: string
  desc: string
  open: boolean
  className?: string
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormModal({ children, title, desc, open, onOpenChange: setOpen, className }: FormModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="ml-auto">
        <Button className="gap-2.5 ">
          <HiPlus className="text-xl" />
          Tambah data
        </Button>
      </DialogTrigger>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary dark:text-white">{title}</DialogTitle>
          <DialogDescription className="text-[13px] font-medium">{desc}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
