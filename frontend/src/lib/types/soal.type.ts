import { GuruType } from './guru.type'
import { KelasType } from './kelas.type'
import { MataPelajaranType } from './mata-pelajaran.type'
import { UserType } from './user.type'

export type DetailSoalType = {
  id: string
  semester: string
  created_at: string
  lama_pengerjaan: number
  tanggal_ujian: string
  mulai_ujian: string
  selesai_ujian: string
  mengajar: {
    tahun_ajaran: string
    mata_pelajaran: MataPelajaranType
    kelas: KelasType
    guru: {
      id: string
      user: GuruType
    }
  }
  hasil: Array<{
    siswa: {
      id_user: string
    }
  }>
}

export type SoalType = {
  data: DetailSoalType[]
  meta: {
    total: number
    current_page: number
    limit: number
  }
}

export type IGetParams = {
  page: number
  q: string
}
