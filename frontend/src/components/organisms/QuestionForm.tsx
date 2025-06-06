import * as React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiOutlineArrowDownCircle, HiOutlineDocumentCheck, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2'

import { DetailSoalFormFieldsType, DetailSoalType } from '@/lib/types/detail.type'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

interface QuestionFormProps {
  isLoading?: boolean
  question?: DetailSoalType
  disabled?: boolean
  onSubmit?: (values: DetailSoalFormFieldsType) => void
  onDelete?: () => void
}

export default function QuestionForm({
  onSubmit: action,
  isLoading,
  question,
  disabled = false,
  onDelete
}: QuestionFormProps) {
  const { toast } = useToast()
  const forms = useForm<DetailSoalFormFieldsType>({ mode: 'onTouched' })

  const answers = forms.watch('options')

  const { fields, append, remove } = useFieldArray({
    control: forms.control,
    name: 'options'
  })

  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    forms.setValue('options', [{ value: '' }])
  }, [forms])

  React.useEffect(() => {
    if (question) {
      forms.setValue('text', question.text)
      forms.setValue('correctAnswer', question.correct_answers)
      forms.setValue('options', question.options)
    }
  }, [question, forms])

  const onSubmit = (values: DetailSoalFormFieldsType) => {
    if (values.type !== 'text') {
      const isSameAnswer = values.options.some((option, index) =>
        values.options.some((option2, index2) => option.value === option2.value && index !== index2)
      )

      if (isSameAnswer) {
        return toast({ title: 'Opsi tidak boleh sama', variant: 'destructive' })
      }
    }

    if (values.type === 'text') values.options[0].value = 'null'
    action && action(values)
  }

  return (
    <article className="relative mt-10 overflow-hidden rounded-xl border px-4 py-3 md:px-6 md:py-5">
      <div className="absolute bottom-0 left-0 top-0 w-1 bg-primary" />
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3 md:gap-5">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-5">
            <FormField
              name="text"
              disabled={disabled}
              control={forms.control}
              rules={{ required: 'Pertanyaan harus diisi' }}
              render={({ field }) => (
                <FormItem className="relative flex-1">
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Pertanyaan" className="w-full" />
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2 md:gap-5">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                name={`options.${index}.value`}
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-3">
                      <RadioGroup className="flex items-center gap-2">
                        <RadioGroupItem value="" />
                        <FormControl>
                          <Input {...field} placeholder="Opsi 1" className="max-w-md" />
                        </FormControl>
                      </RadioGroup>
                      {index > 0 && (
                        <Button size="icon" variant="destructive" onClick={() => remove(index)} type="button">
                          <HiOutlineTrash className="text-base" />
                        </Button>
                      )}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Button className="w-fit gap-2 md:text-xs" onClick={() => append({ value: '' })} type="button">
              <HiOutlinePlus className="text-base" />
              <span className="hidden md:flex">Tambah opsi</span>
            </Button>

            {!disabled && (
              <div className="flex items-center gap-1 md:gap-3">
                {question && question.text && (
                  <Button className="w-fit gap-2 md:text-xs" variant="destructive" type="button" onClick={onDelete}>
                    <HiOutlineTrash className="hidden text-base md:flex" />
                    <span>Hapus</span>
                  </Button>
                )}
                <Button
                  className="w-fit gap-2 md:text-xs"
                  variant="warn"
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <HiOutlineDocumentCheck className="hidden text-base md:flex" />
                  <span>{isOpen ? 'Tutup' : 'Lihat'} jawaban</span>
                </Button>
                <Button className="w-fit gap-2 md:text-xs" variant="info" loading={isLoading}>
                  <HiOutlineArrowDownCircle className="hidden text-base md:flex" />
                  <span>Simpan</span>
                </Button>
              </div>
            )}
          </div>

          {isOpen && (
            <div className="flex flex-col gap-3 border-t pt-3">
              <p className="text-xs font-semibold text-primary/60">Pilih atau buat jawaban kamu!</p>

              <FormField
                name="correctAnswer.0.value"
                control={forms.control}
                rules={{ required: 'Jawaban harus diisi' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup className="flex flex-col gap-2.5" onValueChange={field.onChange} value={field.value}>
                        {answers.map((answer, index) => (
                          <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                            <FormControl>
                              <RadioGroupItem value={answer.value.toLocaleLowerCase()} />
                            </FormControl>
                            <FormLabel className="font-normal">{answer.value}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        </form>
      </Form>
    </article>
  )
}
