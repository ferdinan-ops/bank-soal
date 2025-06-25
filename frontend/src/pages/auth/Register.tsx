import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRegister } from '@/store/server/useAuth'
import { useGetJurusan } from '@/store/server/useJurusan'
import { useGetKelas } from '@/store/server/useKelas'

import { useTitle } from '@/hooks'
import { registerDefaultValues } from '@/lib/defaultValues'
import { RegisterType, registerValidation } from '@/lib/validations/auth.validation'

import { Brand, Password } from '@/components/atoms'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Register() {
  useTitle('Register')
  const navigate = useNavigate()
  const { mutate: register, isLoading } = useRegister()

  const forms = useForm<RegisterType>({
    mode: 'onTouched',
    resolver: yupResolver(registerValidation),
    defaultValues: registerDefaultValues
  })

  const idJurusan = forms.watch('id_jurusan')

  const { data: jurusan } = useGetJurusan()
  const { data: kelas } = useGetKelas(idJurusan)

  const onSubmit = (values: RegisterType) => {
    register(values, {
      onSuccess: () => {
        forms.reset(registerDefaultValues)
        navigate('/login')
      }
    })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col justify-center gap-[10px] px-5 py-8 md:w-[440px] md:p-0">
      <Brand className="static left-6 top-6 mb-5 flex-col text-primary md:absolute md:mb-0 md:flex-row md:text-left text-center" />

      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]">Daftar</h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">
          Silakan masukkan detail Anda untuk membuat akun
        </p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2">
            <FormField
              name="nis"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Nomor Induk Siswa (NIS)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="1201234892" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="fullname"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="john.doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="id_jurusan"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex items-center gap-2 font-semibold dark:text-white">Jurusan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Pilih jurusan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jurusan?.map((item) => (
                        <SelectItem value={item.id} key={item.id} className="cursor-pointer font-semibold capitalize">
                          {item.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="id_kelas"
              control={forms.control}
              disabled={!idJurusan}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex items-center gap-2 font-semibold dark:text-white">Kelas</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!idJurusan}>
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {kelas?.map((item) => (
                        <SelectItem value={item.id} key={item.id} className="cursor-pointer font-semibold capitalize">
                          {item.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
          <FormField
            name="password"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Kata sandi</FormLabel>
                <FormControl>
                  <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="font-semibold" type="submit" loading={isLoading}>
            Daftar
          </Button>
        </form>
      </Form>
      <p className="mt-7 text-center text-[15px] font-semibold text-font">
        Udah punya akun?{' '}
        <Link to="/login" className="text-primary hover:underline dark:text-white">
          Login!
        </Link>
      </p>
    </section>
  )
}
