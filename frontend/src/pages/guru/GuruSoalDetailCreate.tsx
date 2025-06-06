import { useNavigate, useParams } from 'react-router-dom'

import { useCreateDetailSoal } from '@/store/server/useDetail'
import { useGetDetailSoal } from '@/store/server/useSoal'

import { useTitle } from '@/hooks'
import { DetailSoalFormFieldsType } from '@/lib/types/detail.type'

import { BackButton, Loading } from '@/components/atoms'
import { QuestionForm } from '@/components/organisms'

export default function GuruSoalDetailCreate() {
  const navigate = useNavigate()
  const { idSoal, id } = useParams<{ idSoal: string; id: string }>()
  const { data: soal, isSuccess } = useGetDetailSoal(idSoal as string)
  const { mutate: createSoal, isLoading } = useCreateDetailSoal()

  useTitle(`Tambah pertanyaan: ${soal?.mengajar.mata_pelajaran.nama}`)

  const handleCreate = (values: DetailSoalFormFieldsType) => {
    const payload = { id_soal: idSoal, ...values }
    createSoal(payload, {
      onSuccess: () => {
        navigate(`/mengajar/${id}/soal/${idSoal}`)
      }
    })
  }

  return (
    <section className="mx-auto w-full md:w-8/12">
      <BackButton />
      {!isSuccess && <Loading />}
      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]">
          Tambah pertanyaan: {soal?.mengajar.mata_pelajaran.nama}
        </h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">
          Tambahkan pertanyaan baru untuk soal {soal?.mengajar.mata_pelajaran.nama}
        </p>
      </div>
      <QuestionForm onSubmit={handleCreate} isLoading={isLoading} />
    </section>
  )
}
