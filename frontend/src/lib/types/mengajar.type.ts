import { GuruType } from './guru.type'
import { KelasType } from './kelas.type'
import { MataPelajaranType } from './mata-pelajaran.type'

export type MengajarBodyType = {
  tahun_ajaran: string
  id_guru: string
  id_mata_pelajaran: string
  id_kelas: string
}

export type MengajarType = {
  id: string
  guru: {
    id: string
    user: GuruType
  }
  kelas: KelasType
  mata_pelajaran: MataPelajaranType
} & MengajarBodyType
