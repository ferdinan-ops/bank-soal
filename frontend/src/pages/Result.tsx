import { HiCheck, HiXMark } from 'react-icons/hi2'
import { useNavigate, useParams } from 'react-router-dom'

import { useUserInfo } from '@/store/client'
import { useLogout } from '@/store/server/useAuth'
import { useGetAnswers } from '@/store/server/useJawaban'
import { useGetDetailSoal } from '@/store/server/useSoal'

import { cn } from '@/lib/utils'
import { UserRole } from '@/lib/constant'
import { formatDate } from '@/lib/services/time'
import { AnswerType } from '@/lib/types/jawaban.type'

import { Info } from '@/components/organisms'
import { Brand, Loading } from '@/components/atoms'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const getCorrectAnswer = (data: AnswerType[]) => {
  return data.filter((item) => item.is_correct).length
}

const getNilai = (correct: number, total: number) => (100 / total) * correct

export default function Result() {
  const navigate = useNavigate()
  const { id, userId, idSoal } = useParams<{ id: string; userId: string; idSoal: string }>()

  const user = useUserInfo((state) => state.user)
  const { data: detailSoal, isSuccess } = useGetDetailSoal((idSoal || id) as string)
  const { data: answers, isSuccess: successAnswer } = useGetAnswers((idSoal || id) as string, userId)
  const { mutate: logout } = useLogout()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!isSuccess || !successAnswer) {
    return <Loading />
  }

  console.log({ answers })

  return (
    <section className="mx-auto flex w-full flex-col md:w-10/12">
      <article className="flex flex-col gap-3 rounded-xl border border-primary/30 p-8">
        <div className="flex items-center justify-between border-b border-primary/30 pb-5">
          <Brand imageClassName="xl:w-9 w-7 mb-1.5" className="gap-3 text-lg font-bold xl:gap-4 xl:text-xl" />
          <div className="flex flex-col">
            <span className="-mb-1 text-[13px] font-semibold text-primary">Diunggah:</span>
            <span className="text-sm font-bold text-primary">{formatDate(detailSoal.created_at)}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 pt-4">
          <table>
            <tbody>
              <Info title="Mata Pelajaran" content={detailSoal.mengajar.mata_pelajaran.nama} />
              <Info title="Jurusan" content={detailSoal.mengajar.kelas.jurusan.nama} />
              <Info title="Kelas" content={detailSoal.mengajar.kelas.nama} />
            </tbody>
          </table>
          <table>
            <tbody>
              <Info title="Semester" content={detailSoal.semester} />
              <Info title="Tahun Ajaran" content={detailSoal.mengajar.tahun_ajaran} />
              <Info title="Pengajar" content={detailSoal.mengajar.guru.user.fullname} />
            </tbody>
          </table>
        </div>
      </article>

      <article
        className={cn(
          'mx-auto mt-8 flex w-fit min-w-20 flex-col items-center justify-center rounded-md bg-green-500 p-3 text-white',
          getNilai(getCorrectAnswer(answers), answers.length) < 50 && 'bg-red-500'
        )}
      >
        <span className="text-sm font-medium">Nilai</span>
        <h3 className="text-4xl font-bold">{getNilai(getCorrectAnswer(answers), answers.length)}</h3>
      </article>

      {answers.map((item) => (
        <article className="flex flex-col" key={item.id}>
          <div className="relative mt-10 overflow-hidden rounded-xl border px-4 py-3 md:px-6 md:py-5">
            <div className="absolute bottom-0 left-0 top-0 w-1 bg-primary" />
            <div className="flex flex-col gap-3 md:gap-5">
              <p className="text-xs font-medium leading-relaxed md:text-sm">{item.question?.text}</p>
              <div className="flex flex-col gap-2 md:gap-5">
                <RadioGroup disabled className="flex flex-col gap-2.5 md:gap-4" value={item.answer as string}>
                  {item.question?.options.map((answer, index) => (
                    <div className="flex items-center space-x-3 space-y-0" key={index}>
                      <RadioGroupItem value={answer.value.toLocaleLowerCase()} />
                      <Label className="cursor-pointer text-[11px] font-medium dark:text-white md:text-xs">
                        {answer.value}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {user.role === UserRole.GURU && (
                  <div
                    className={cn(
                      'flex w-fit items-center gap-2 rounded-md p-2',
                      item.is_correct
                        ? 'bg-green-100 text-green-500'
                        : item.answer === ''
                          ? 'bg-yellow-100 text-yellow-500'
                          : 'bg-red-100 text-red-500'
                    )}
                  >
                    {item.is_correct ? <HiCheck className="text-lg" /> : <HiXMark className="text-lg" />}
                    <span className="text-sm font-semibold">
                      {item.is_correct ? 'Benar' : item.answer === '' ? 'Belum dijawab' : 'Salah'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}

      {user.role === UserRole.SISWA ? (
        <Button variant="default" className="ml-auto mt-5" onClick={handleLogout}>
          Selesai
        </Button>
      ) : (
        <Button variant="outline" className="ml-auto mt-5" onClick={() => navigate(-1)}>
          Kembali
        </Button>
      )}
    </section>
  )
}
