import { Control, FieldValues } from 'react-hook-form'

import { DetailSoalType } from '@/lib/types/detail.type'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

interface AnswerFormProps {
  name: string
  question: DetailSoalType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<FieldValues, any>
}

export default function AnswerForm({ name, question, formControl }: AnswerFormProps) {
  return (
    <article
      className="relative mt-5 xl:mt-10 overflow-hidden rounded-xl border px-4 py-3 dark:text-primary md:px-6 md:py-5"
      key={question.id}
    >
      <div className="absolute bottom-0 left-0 top-0 w-1 bg-primary" />
      <div className="flex flex-col gap-3 md:gap-5">
        <p className="text-xs font-medium leading-relaxed md:text-sm">{question.text}</p>
        <div className="flex flex-col gap-2 md:gap-5">
          <FormField
            name={name}
            control={formControl}
            defaultValue={{ id_detail_soal: question.id, answer: '' }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    className="flex flex-col gap-2.5 md:gap-4"
                    onValueChange={(value) => field.onChange({ id_detail_soal: question.id, answer: value })}
                  >
                    {question.options.map((answer, index) => (
                      <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                        <FormControl>
                          <RadioGroupItem
                            value={answer.value.toLocaleLowerCase()}
                            className="dark:focus-visible:ring-primary"
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer text-[11px] font-medium md:text-xs">
                          {answer.value}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </article>
  )
}
