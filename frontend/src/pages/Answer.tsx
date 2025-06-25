import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { useUserInfo } from '@/store/client'
import { useGetDetailSoal } from '@/store/server/useSoal'
import { useGetAllDetailSoalForUser } from '@/store/server/useDetail'
import { useCreateAnswers, useGetAnswers } from '@/store/server/useJawaban'

import { useTimer } from '@/hooks'
import { UserRole } from '@/lib/constant'

import { Brand, Loading } from '@/components/atoms'
import { AnswerForm, Guide, Info, Timer } from '@/components/organisms'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

export default function Answer() {
  const navigate = useNavigate()
  const user = useUserInfo((state) => state.user)
  const { id, time } = useParams<{ id: string; time: string }>()
  const { data: detailSoal, isSuccess } = useGetDetailSoal(id as string)
  const { data: soal, isSuccess: successGet } = useGetAllDetailSoalForUser(id as string)
  const { data: answers } = useGetAnswers(id as string, undefined, user.role === UserRole.SISWA)
  console.log('answers', answers)

  const { mutate: createAnswer, isLoading } = useCreateAnswers()

  const [openGuide, setOpenGuide] = React.useState(true)
  const [isTimerStart, setIsTimerStart] = React.useState(false)
  const { isFinished, timeLeft, setIsFinished } = useTimer(!openGuide && isTimerStart, Number(time))

  const forms = useForm()

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    const payload = { answers: values?.data, id_soal: id as string }

    createAnswer(payload, {
      onSuccess: () => {
        navigate(`/answer/${id}/result`)
      }
    })
  }

  if (!isSuccess || !successGet) {
    return <Loading />
  }

  return (
    <section className="relative mx-auto flex w-full flex-col md:w-10/12">
      {user.role === UserRole.SISWA && (!answers || answers?.length === 0) && (
          <React.Fragment>
            <Timer
              timer={{ timeLeft, isFinished, setIsFinished, time: detailSoal?.lama_pengerjaan ?? 15 }}
              actionAfterFinish={async () => await onSubmit(forms.getValues)}
            />
            <Guide
              open={openGuide}
              onOpenChange={setOpenGuide}
              action={() => {
                setIsTimerStart(true)
                setOpenGuide(false)
              }}
            />
          </React.Fragment>
        )}
      <article className="flex flex-col gap-3 rounded-xl border border-primary/30 p-4 xl:p-8">
        <div className="flex items-center justify-between border-b border-primary/30 pb-3 xl:pb-5">
          <Brand imageClassName="xl:w-9 w-7 mb-1.5 w-7 h-5" className="gap-1 text-sm font-bold xl:gap-4 xl:text-xl" />
          <div className="flex flex-col">
            <span className="-mb-1 text-[11px] xl:text-[13px] font-semibold text-primary">Lama pengerjaan:</span>
            <span className="text-right text-xs xl:text-sm font-bold text-primary">{detailSoal.lama_pengerjaan} menit</span>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 pt-1 xl:pt-4">
          <table>
            <tbody className="xl:text-base text-[13px]">
              <Info title="Mata Pelajaran" content={detailSoal.mengajar.mata_pelajaran.nama} />
              <Info title="Jurusan" content={detailSoal.mengajar.kelas.jurusan.nama} />
              <Info title="Kelas" content={detailSoal.mengajar.kelas.nama} />
              <Info title="Semester" content={detailSoal.semester} className="xl:hidden" />
              <Info title="Tahun Ajaran" content={detailSoal.mengajar.tahun_ajaran} className="xl:hidden" />
              <Info title="Pengajar" content={detailSoal.mengajar.guru.user.fullname} className="xl:hidden" />
            </tbody>
          </table>
          <table className="hidden xl:block">
            <tbody>
              <Info title="Semester" content={detailSoal.semester} />
              <Info title="Tahun Ajaran" content={detailSoal.mengajar.tahun_ajaran} />
              <Info title="Pengajar" content={detailSoal.mengajar.guru.user.fullname} />
            </tbody>
          </table>
        </div>
      </article>

      <Form {...forms}>
        <form className="flex flex-col" onSubmit={forms.handleSubmit(onSubmit)}>
          {soal.map((item, index) => (
            <AnswerForm key={item.id} name={`data.${index}`} formControl={forms.control} question={item} />
          ))}
          <div className="ml-auto mt-5 flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate(-1)} type="button" disabled={isTimerStart}>
              Kembali
            </Button>
            {user.role === UserRole.SISWA &&
              (answers && answers.length > 0 ? (
                <Button loading={isLoading} type="button" onClick={() => navigate(`/answer/${id}/result`)}>
                  Lihat jawabanku sebelumnya
                </Button>
              ) : (
                <Button loading={isLoading} type="submit">
                  Cek jawabanku
                </Button>
              ))}
          </div>
        </form>
      </Form>
    </section>
  )
}
