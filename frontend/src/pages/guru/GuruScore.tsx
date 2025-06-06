import { useNavigate, useParams } from 'react-router-dom'

import { useGetAnswerBySoal } from '@/store/server/useJawaban'

import { useTitle } from '@/hooks'
import { AnswerType } from '@/lib/types/jawaban.type'
import { formatDate } from '@/lib/services/time'

import { BackButton } from '@/components/atoms'
import { Section } from '@/components/organisms'

const getCorrectAnswer = (data: AnswerType[]) => {
  return data.filter((item) => item.is_correct).length
}

const getNilai = (correct: number, total: number) => (100 / total) * correct

export default function GuruScore() {
  useTitle('Daftar Nilai')
  const navigate = useNavigate()
  const { idSoal, id } = useParams<{ idSoal: string; id: string }>()
  const { data: score, isLoading } = useGetAnswerBySoal(idSoal as string)

  return (
    <Section isLoading={isLoading}>
      <BackButton />
      <Section.Head title="Daftar Nilai" desc="Berikut adalah daftar nilai yang telah terdaftar." />

      <Section.Body>
        <Section.Table
          headers={['#', 'NIS', 'Nama Siswa', 'Jurusan', 'Kelas', 'Nilai', 'Tanggal']}
          dataLength={score?.length || 0}
        >
          {score?.map((item, index) => (
            <Section.Row
              key={item.id}
              details={[
                {
                  type: 'detail',
                  onClick: () => navigate(`/mengajar/${id}/soal/${idSoal}/score/${item.siswa.user.id}`)
                }
              ]}
            >
              <Section.Cell>{index + 1}</Section.Cell>
              <Section.Cell>{item.siswa?.nis}</Section.Cell>
              <Section.Cell>{item.siswa?.user?.fullname}</Section.Cell>
              <Section.Cell>{item.siswa?.kelas.jurusan.nama}</Section.Cell>
              <Section.Cell>{item.siswa?.kelas.nama}</Section.Cell>
              <Section.Cell>{getNilai(getCorrectAnswer(item.answers), item.answers.length)}</Section.Cell>
              <Section.Cell>{formatDate(item.created_at)}</Section.Cell>
            </Section.Row>
          ))}
        </Section.Table>
      </Section.Body>
    </Section>
  )
}
