import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { HiCamera } from 'react-icons/hi2'
import { yupResolver } from '@hookform/resolvers/yup'

import { cn } from '@/lib/utils'
import { UserType } from '@/lib/types/user.type'
import { ChangeProfilePicType, changeProfilePicValidation } from '@/lib/validations/user.validation'

import { useUpdateProfilePic } from '@/store/server/useUser'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'

import { Dropzone, Image } from '@/components/atoms'
import { FileWithPreview } from '@/components/atoms/forms/Dropzone'

interface UploadPhotoProps {
  user: UserType
  className?: string
  imageClassName?: string
}

export default function UploadPhoto({ user, className, imageClassName }: UploadPhotoProps) {
  const [open, setOpen] = React.useState(false)
  const { mutate: updateProfilePic, isLoading } = useUpdateProfilePic()

  const forms = useForm<ChangeProfilePicType>({
    mode: 'onTouched',
    resolver: yupResolver(changeProfilePicValidation)
  })

  const onSubmit = (values: ChangeProfilePicType) => {
    updateProfilePic(values, {
      onSuccess: () => {
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            'group relative mx-auto mb-8 h-[200px] w-[200px] cursor-pointer overflow-hidden rounded-full text-4xl  md:text-6xl',
            imageClassName
          )}
        >
          <div className="absolute inset-0 z-[2] flex bg-font/60 opacity-0 transition-opacity group-hover:opacity-100">
            <HiCamera className="m-auto text-white" />
          </div>
          <Image alt={user?.fullname} src={user?.photo} className="relative z-[1] h-full w-full object-cover" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary dark:text-white">Ubah Foto Profil</DialogTitle>
          <DialogDescription className="text-[13px] font-medium">
            Silahkan unggah foto profil untuk membuat akun kamu lebih atraktif
          </DialogDescription>
        </DialogHeader>
        <Form {...forms}>
          <form className={cn('mt-2 grid items-start gap-4', className)} onSubmit={forms.handleSubmit(onSubmit)}>
            <FormField
              name="photo"
              control={forms.control}
              render={({ field }) => (
                <Dropzone
                  id="photo"
                  closedModal={() => setOpen(false)}
                  setValue={field.onChange}
                  fileValue={field.value as unknown as FileWithPreview[]}
                  accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                />
              )}
            />
            <Button type="submit" loading={isLoading}>
              Unggah
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
