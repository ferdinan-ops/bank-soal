import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CalendarIcon } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'

import { useCreateSoal, useGetDetailSoal, useUpdateSoal } from '@/store/server/useSoal'

import { useTitle } from '@/hooks'

import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/services/time'
import { SoalPayloadType, soalValidation } from '@/lib/validations/soal.validation'

import { BackButton } from '@/components/atoms'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Section } from '@/components/organisms'

export default function GuruSoalCreate() {
  useTitle('Tambah soal')

  const navigate = useNavigate()
  const { idSoal, id } = useParams<{ idSoal: string; id: string }>()

  const { data: soal, isSuccess, isLoading: isLoadingGet } = useGetDetailSoal(idSoal as string, true)
  const { mutate: createSoal, isLoading } = useCreateSoal()
  const { mutate: updateSoal, isLoading: loadingUpdate } = useUpdateSoal()

  const forms = useForm({
    mode: 'onTouched',
    resolver: yupResolver(soalValidation)
  })

  useEffect(() => {
    if (isSuccess && idSoal) {
      forms.setValue('semester', soal.semester)
      forms.setValue('lama_pengerjaan', soal.lama_pengerjaan)
      forms.setValue('tanggal_ujian', new Date(soal.tanggal_ujian))
      forms.setValue('mulai_ujian', soal.mulai_ujian)
      forms.setValue('selesai_ujian', soal.selesai_ujian)
    }
  }, [isSuccess, forms, soal, idSoal])

  const onSuccess = () => {
    forms.reset()
    navigate(`/mengajar/${id}/soal`)
  }

  const onSubmit = (values: SoalPayloadType) => {
    const data = { ...values, id_mengajar: id }

    const tanggalUjian = new Date(data.tanggal_ujian)

    console.log({ id: idSoal, ...data, tanggal_ujian: tanggalUjian })

    if (idSoal) {
      const payload = { id: idSoal, ...data, tanggal_ujian: tanggalUjian }
      return updateSoal(payload, { onSuccess })
    }

    createSoal({ ...data, tanggal_ujian: tanggalUjian }, { onSuccess })
  }

  return (
    <Section className="mx-auto flex w-full flex-col gap-[10px] px-5 md:w-6/12 md:p-0" isLoading={isLoadingGet}>
      <BackButton />
      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]">
          {idSoal ? 'Ubah Soal' : 'Buat soal baru'}
        </h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">
          Silahkan isi seluruh formulir dibawah ini untuk dapat mengunggah soal ke dalam sistem.
        </p>
      </div>

      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-6">
          <FormField
            name="semester"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-2 font-semibold dark:text-white">Semester</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Pilih semester" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['Genap', 'Ganjil'].map((item, index) => (
                      <SelectItem value={item} key={index} className="cursor-pointer font-semibold capitalize">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <FormField
              control={forms.control}
              name="tanggal_ujian"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col">
                  <FormLabel className="font-semibold">Tanggal Ujian</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('text-left', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? (
                            formatDate(field.value.toISOString())
                          ) : (
                            <span className="font-normal">Pilih Tanggal Ujian</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} className="bg-white" />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lama_pengerjaan"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Lama pengerjaan (menit)</FormLabel>
                  <FormControl>
                    <Input value={field.value || ''} onChange={field.onChange} type="number" min={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <FormField
              control={forms.control}
              name="mulai_ujian"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Mulai Ujian</FormLabel>
                  <FormControl>
                    <Input value={field.value || ''} onChange={field.onChange} type="time" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={forms.control}
              name="selesai_ujian"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Selesai Ujian</FormLabel>
                  <FormControl>
                    <Input value={field.value || ''} onChange={field.onChange} type="time" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button className="ml-auto w-fit font-semibold text-white" type="submit" loading={isLoading || loadingUpdate}>
            {idSoal ? 'Ubah soal' : 'Unggah soal'}
          </Button>
        </form>
      </Form>
    </Section>
  )
}
