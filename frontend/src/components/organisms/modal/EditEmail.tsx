import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { HiOutlineEnvelope } from 'react-icons/hi2'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { cn } from '@/lib/utils'
import { UpdateEmailType, updateEmailValidation } from '@/lib/validations/user.validation'

import { useToken } from '@/store/client'
import { useUpdateEmail } from '@/store/server/useUser'

interface EditEmailProps {
  email: string
  className?: string
}

export default function EditEmail({ email, className }: EditEmailProps) {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const { mutate: updateEmail, isLoading } = useUpdateEmail()

  const { removeAccessToken, removeRefreshToken } = useToken((state) => ({
    removeAccessToken: state.removeAccessToken,
    removeRefreshToken: state.removeRefreshToken
  }))

  const forms = useForm<UpdateEmailType>({
    mode: 'onTouched',
    resolver: yupResolver(updateEmailValidation),
    defaultValues: { email: '' }
  })

  React.useEffect(() => {
    if (email) forms.setValue('email', email)
  }, [email, forms])

  const onSubmit = (values: UpdateEmailType) => {
    updateEmail(values.email, {
      onSuccess: () => {
        setOpen(false)
        navigate('/verify')
        setTimeout(() => {
          removeAccessToken()
          removeRefreshToken()
        }, 2000)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-2.5 bg-zinc-300 text-[13px] text-font">
          <HiOutlineEnvelope className="text-xl" />
          Ubah Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary dark:text-white">Ubah Email kamu</DialogTitle>
          <DialogDescription className="text-[13px] font-medium">
            Silahkan isi alamat email yang baru untuk mengubah email kamu
          </DialogDescription>
        </DialogHeader>
        <Form {...forms}>
          <form className={cn('mt-2 grid items-start gap-4', className)} onSubmit={forms.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="johndoe@email.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" loading={isLoading}>
              Ubah Email
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
