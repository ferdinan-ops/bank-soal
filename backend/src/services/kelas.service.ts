import db from '../utils/db'

interface IKelas {
  nama: string
  id_jurusan: string
}

export const storeKelas = async (payload: IKelas) => {
  return db.kelas.create({ data: payload })
}

export const changeKelas = async (id: string, payload: IKelas) => {
  return db.kelas.update({ where: { id }, data: payload })
}

export const removeKelas = async (id: string) => {
  return db.kelas.delete({ where: { id } })
}

export const fetchAllKelas = async (idJurusan: string) => {
  return db.kelas.findMany({
    where: { id_jurusan: idJurusan },
    include: { jurusan: true, mengajar: true, siswa: true },
    orderBy: { nama: 'asc' }
  })
}
