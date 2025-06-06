import { DetailSoalType } from './detail.type'
import { KelasType } from './kelas.type'
import { DetailSoalType as Detail } from './soal.type'
import { SoalType } from './soal.type'
import { UserType } from './user.type'

export type AnswerType = {
  id: string
  answer: string
  is_correct: boolean
  id_user: string
  id_soal: string
  question: DetailSoalType
  soal: SoalType
}

export type ScoreType = {
  id: string
  id_user: string
  id_soal: string
  answers: AnswerType[]
  soal: Detail
  user: UserType
  created_at: string
}

export type ScoreDetailType = {
  siswa: {
    id: string
    nis: string
    kelas: KelasType
    user: UserType
  }
} & ScoreType
