import { useNavigate, useParams } from 'react-router-dom'

import { useDialog } from '@/store/client/useDialog'
import { useDeleteSoal, useGetSoalByMengajar } from '@/store/server/useSoal'

import { useTitle } from '@/hooks'
import { formatDate } from '@/lib/services/time'

import { BackButton } from '@/components/atoms'
import { Section } from '@/components/organisms'

import { Button } from '@/components/ui/button'

export default function GuruSoal() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: soal, isLoading, isFetching } = useGetSoalByMengajar(id as string)

  useTitle('Daftar Soal')

  const { dialog } = useDialog()
  const { mutateAsync: deleteSoal, isLoading: isLoadingDelete } = useDeleteSoal()

  const handleDelete = (id: string) => {
    void dialog({
      title: 'Apa kamu yakin?',
      description: 'Soal yang telah dihapus tidak dapat dikembalikan',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteSoal(id)
    })
  }

  return (
    <Section isLoading={isLoading || isLoadingDelete || isFetching}>
      <BackButton />
      <Section.Head
        title={`Daftar Soal${soal && soal?.length > 0 ? `: ${soal?.[0].mengajar.mata_pelajaran.nama}` : ''}`}
        desc="Berikut adalah daftar soal yang telah didaftarkan."
      >
        <Button onClick={() => navigate(`/mengajar/${id}/soal/create`)}>Tambah Soal</Button>
      </Section.Head>

      <Section.Body>
        <Section.Table
          headers={[
            '#',
            'Jurusan',
            'Kelas',
            'Semester',
            'Tanggal Ujian',
            'Waktu Mulai',
            'Waktu Selesai',
            'Lama Pengerjaan'
          ]}
          dataLength={soal?.length || 0}
        >
          {soal?.map((item, index) => (
            <Section.Row
              key={item.id}
              details={[
                { type: 'detail', label: 'Detail soal', onClick: () => navigate(`/mengajar/${id}/soal/${item.id}`) },
                {
                  type: 'detail',
                  label: 'Jawaban siswa',
                  onClick: () => navigate(`/mengajar/${id}/soal/${item.id}/score`)
                },
                { type: 'edit', onClick: () => navigate(`/mengajar/${id}/soal/create/${item.id}`) },
                { type: 'delete', onClick: () => handleDelete(item.id) }
              ]}
            >
              <Section.Cell>{index + 1}</Section.Cell>
              <Section.Cell>{item.mengajar.kelas.jurusan.nama}</Section.Cell>
              <Section.Cell>{item.mengajar.kelas.nama}</Section.Cell>
              <Section.Cell>{item.semester}</Section.Cell>
              <Section.Cell>{formatDate(item.tanggal_ujian)}</Section.Cell>
              <Section.Cell>{item.mulai_ujian}</Section.Cell>
              <Section.Cell>{item.selesai_ujian}</Section.Cell>
              <Section.Cell>{item.lama_pengerjaan} menit</Section.Cell>
            </Section.Row>
          ))}
        </Section.Table>
      </Section.Body>
    </Section>
  )
}
