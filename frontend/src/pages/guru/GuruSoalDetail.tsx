import { HiPlus } from 'react-icons/hi2'
import { useNavigate, useParams } from 'react-router-dom'

import { useDialog } from '@/store/client/useDialog'
import { useGetDetailSoal } from '@/store/server/useSoal'
import { useDeleteDetailSoal, useGetAllDetailSoal, useUpdateDetailSoal } from '@/store/server/useDetail'

import { DetailSoalFormFieldsType } from '@/lib/types/detail.type'

import { BackButton, Loading } from '@/components/atoms'
import { QuestionForm } from '@/components/organisms'

import { Button } from '@/components/ui/button'

export default function GuruSoalDetail() {
  const navigate = useNavigate()
  const { dialog } = useDialog()
  const { idSoal, id } = useParams<{ idSoal: string; id: string }>()

  const { data: soal, isSuccess } = useGetDetailSoal(idSoal as string)
  const { data: detail, isSuccess: successDetail } = useGetAllDetailSoal(idSoal as string)

  const { mutate: updateDetailSoal, isLoading } = useUpdateDetailSoal()
  const { mutateAsync: deleteDetailSoal, isLoading: isLoadingDelete } = useDeleteDetailSoal()

  if (!isSuccess || !successDetail) return <Loading />

  const handleUpdateQuestion = (id: string, values: DetailSoalFormFieldsType) => {
    const payload = { id_soal: id, ...values }
    updateDetailSoal(payload)
  }

  const handleDeleteQuestion = (id: string) => {
    void dialog({
      title: 'Apa kamu yakin?',
      description: 'Soal yang telah dihapus tidak dapat dikembalikan',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteDetailSoal(id)
    })
  }

  return (
    <section className="mx-auto w-full md:w-8/12">
      <BackButton />
      <section className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]">
            Daftar pertanyaan ~ {soal.mengajar.mata_pelajaran.nama}
          </h2>
          <p className="text-[13px] font-medium text-zinc-500 md:text-sm">
            Berikut adalah seluruh daftar pertanyaan yang telah didaftarkan pada soal{' '}
            {soal.mengajar.mata_pelajaran.nama}.
          </p>
        </div>
        <Button className="gap-2" onClick={() => navigate(`/mengajar/${id}/soal/${idSoal}/create`)}>
          <HiPlus className="text-lg" />
          <span className="text-xs">Tambah pertanyaan</span>
        </Button>
      </section>
      <div>
        {detail?.map((question) => (
          <QuestionForm
            key={question.id}
            question={question}
            isLoading={isLoading || isLoadingDelete}
            onSubmit={(values) => handleUpdateQuestion(question.id, values)}
            onDelete={() => handleDeleteQuestion(question.id)}
          />
        ))}
      </div>
    </section>
  )
}
