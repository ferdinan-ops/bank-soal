import db from '../utils/db'

interface IJurusan {
  nama: string
}

export const storeJurusan = async (payload: IJurusan) => {
  return db.jurusan.create({ data: payload })
}

export const changeJurusan = async (id: string, payload: IJurusan) => {
  return db.jurusan.update({ where: { id }, data: payload })
}

export const removeJurusan = async (id: string) => {
  return db.jurusan.delete({ where: { id } })
}

export const fetchAllJurusan = async () => {
  return db.jurusan.findMany({ include: { kelas: true } })
}
