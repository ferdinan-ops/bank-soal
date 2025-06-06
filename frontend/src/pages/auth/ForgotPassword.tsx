import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForgotPassword } from '@/store/server/useAuth'

import { useTitle } from '@/hooks'
import { ForgotPasswordType, forgotPasswordValidation } from '@/lib/validations/auth.validation'

import { Brand } from '@/components/atoms'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

export default function ForgotPassword() {
  useTitle('Forgot Password')
  const navigate = useNavigate()
  const { mutate: forgotPassword, isLoading } = useForgotPassword()

  const forms = useForm<ForgotPasswordType>({
    mode: 'onTouched',
    resolver: yupResolver(forgotPasswordValidation),
    defaultValues: { email: '' }
  })

  const onSubmit = (values: ForgotPasswordType) => {
    forgotPassword(values.email, {
      onSuccess: () => {
        forms.reset({ email: '' })
        navigate('/reset-password')
      }
    })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col justify-center gap-[10px] px-5 py-8 md:w-[440px] md:p-0">
      <Brand className="static left-6 top-6 mb-5 flex-col text-primary md:absolute md:mb-0 md:flex-row" />

      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]">Lupa Kata Sandi</h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">
          Masukkan email yang Anda gunakan untuk membuat akun agar kami dapat mengirimkan instruksi tentang cara
          mengatur ulang kata sandi.
        </p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <FormField
            name="email"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="johndoe@email.com" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="font-semibold" type="submit" loading={isLoading}>
            Kirim
          </Button>
        </form>
      </Form>
    </section>
  )
}
