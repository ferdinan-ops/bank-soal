import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { HiOutlineArrowLeftOnRectangle, HiOutlineLockClosed } from 'react-icons/hi2'

import { useUserInfo } from '@/store/client'
import { useLogout } from '@/store/server/useAuth'
import { useUpdateMe } from '@/store/server/useUser'

import { useTitle } from '@/hooks'
import { EditUserType, editUserValidation } from '@/lib/validations/user.validation'

import { Alert, EditEmail } from '@/components/organisms'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const alertConf = {
  title: 'Anda yakin keluar dari aplikasi?',
  desc: 'Tindakan ini akan mengeluarkan akun Anda dari aplikasi kami. Namun Anda bisa kembali lagi dengan login.',
  btnTxt: 'Keluar'
}

export default function Account() {
  useTitle('Akun')
  const navigate = useNavigate()
  const user = useUserInfo((state) => state.user)

  console.log(user)

  const { mutate: logout } = useLogout()
  const { mutate: updateMe, isLoading } = useUpdateMe()

  const forms = useForm<EditUserType>({
    mode: 'onTouched',
    resolver: yupResolver(editUserValidation)
  })

  React.useEffect(() => {
    forms.setValue('fullname', user?.fullname as string)
    // forms.setValue('username', user?.username as string)
  }, [user, forms])

  const onSubmit = (values: EditUserType) => {
    updateMe(values)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <section className="flex flex-col xl:mx-auto xl:w-6/12 xl:px-0">
      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]">Pengaturan Akun</h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">
          Pada halaman ini Anda bisa mengubah data dan pengaturan dari akun yang Anda miliki ini.
        </p>
      </div>
      <div className="mt-10 border-b pb-5 xl:pb-10">
        {/* <UploadPhoto user={user as UserType} /> */}
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="col-span-1 flex w-full flex-col gap-5">
            <FormField
              name="fullname"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              name="username"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Username</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="john.doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button className="ml-auto w-fit text-[13px]" loading={isLoading}>
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex xl:w-fit gap-3 pt-4 xl:pt-10 xl:flex-row flex-col">
        <Button
          variant="outline"
          onClick={() => navigate('/me/reset-password')}
          className="flex-1 gap-2.5 border-zinc-300 text-[13px] text-font"
        >
          <HiOutlineLockClosed className="text-xl" />
          Atur ulang kata sandi
        </Button>
        <EditEmail email={user?.email as string} className="flex-1" />
        <Alert title={alertConf.title} desc={alertConf.desc} btnText={alertConf.btnTxt} action={handleLogout}>
          <button className="relative inline-flex h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-red-500 px-5 text-sm font-medium text-zinc-50 ring-offset-white transition-colors hover:bg-red-500/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-red-900 dark:text-zinc-50 dark:ring-offset-zinc-950 dark:hover:bg-red-900/90 dark:focus-visible:ring-zinc-300 py-2.5">
            <HiOutlineArrowLeftOnRectangle className="text-xl" />
            Keluar dari aplikasi
          </button>
        </Alert>
      </div>
    </section>
  )
}
