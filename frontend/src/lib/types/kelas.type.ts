import { JurusanType } from './jurusan.type'

export type KelasBodyType = {
  nama: string
  id_jurusan: string
}

export type KelasType = {
  id: string
  jurusan: JurusanType
} & KelasBodyType
