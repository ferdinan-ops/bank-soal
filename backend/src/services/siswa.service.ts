import db from '../utils/db'

export interface ISiswa {
  nis: string
  id_user: string
  id_kelas: string
}

export const storeSiswa = async (payload: ISiswa) => {
  return await db.siswa.create({ data: payload })
}
