import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocation, useNavigate } from 'react-router-dom'

import { useResetPassword } from '@/store/server/useAuth'

import { useTitle } from '@/hooks'
import { resetPasswordDefaultValues } from '@/lib/defaultValues'
import { ResetPasswordType, changePasswordValidation, resetPasswordValidation } from '@/lib/validations/auth.validation'

import { Brand, Password } from '@/components/atoms'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const CHANGE_PASSWORD = '/me/reset-password'

export default function ResetPassword() {
  useTitle('Reset Password')
  const navigate = useNavigate()
  const location = useLocation()
  const isChangePassword = location.pathname === CHANGE_PASSWORD

  const { mutate: resetPassword, isLoading } = useResetPassword()

  const forms = useForm<ResetPasswordType>({
    mode: 'onTouched',
    resolver: yupResolver(isChangePassword ? changePasswordValidation : resetPasswordValidation),
    defaultValues: resetPasswordDefaultValues
  })

  const onSubmit = (values: ResetPasswordType) => {
    if (!isChangePassword) {
      const data = { token: values.token as string, password: values.password }
      return resetPassword(data, {
        onSuccess: () => {
          forms.reset(resetPasswordDefaultValues)
          navigate('/login')
        }
      })
    }
  }

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col justify-center gap-[10px] px-5 py-8 md:w-[440px] md:p-0">
      <Brand className="static left-6 top-6 mb-5 flex-col text-primary md:absolute md:mb-0 md:flex-row" />

      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]">Atur Ulang Kata Sandi</h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">Pilih kata sandi baru untuk akun Anda</p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          {!isChangePassword && (
            <FormField
              name="token"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kode verifikasi</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="76d67hi" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            name="password"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Kata sandi baru</FormLabel>
                <FormControl>
                  <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Konfirmasi kata sandi baru</FormLabel>
                <FormControl>
                  <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="font-semibold" type="submit" loading={isLoading}>
            Atur ulang kata sandi
          </Button>
        </form>
      </Form>
    </section>
  )
}
