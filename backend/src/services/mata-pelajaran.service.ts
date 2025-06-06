import { UserRole } from '.prisma/client'
import { IGetParams } from '../types/params.type'
import db from '../utils/db'

interface IMataPelajaran {
  nama: string
}

export const storeMataPelajaran = async (payload: IMataPelajaran) => {
  return await db.mataPelajaran.create({
    data: {
      nama: payload.nama
    }
  })
}

export const removeMataPelajaran = async (id: string) => {
  return await db.mataPelajaran.delete({ where: { id } })
}

export const changeMataPelajaran = async (id: string, payload: IMataPelajaran) => {
  return await db.mataPelajaran.update({
    where: { id },
    data: {
      nama: payload.nama
    }
  })
}

export const fetchAllMataPelajaran = async ({
  page,
  limit,
  search,
  userid,
  role
}: IGetParams & { userid: string; role: UserRole }) => {
  const [data, count] = await db.$transaction([
    db.mataPelajaran.findMany({
      where: {
        OR: [{ nama: { contains: search } }],
        ...(role === 'GURU' && {
          mengajar: {
            some: { guru: { id_user: userid } }
          }
        })
      },
      include: {
        mengajar: {
          include: {
            guru: { include: { user: true } },
            kelas: { include: { jurusan: true } }
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { nama: 'asc' }
    }),
    db.mataPelajaran.count({
      where: {
        OR: [{ nama: { contains: search } }],
        ...(role === 'GURU' && {
          mengajar: {
            some: { guru: { id_user: userid } }
          }
        })
      }
    })
  ])

  return { data, count }
}

export const fetchMataPelajaran = async (id: string) => {
  return await db.mataPelajaran.findUnique({
    where: { id },
    include: {
      mengajar: {
        include: {
          guru: { include: { user: true } },
          kelas: { include: { jurusan: true } }
        }
      }
    }
  })
}

export const fetchKelasByMataPelajaranId = async (id: string) => {
  return await db.kelas.findMany({
    where: { mengajar: { every: { mata_pelajaran: { id: id } } } },
    include: { jurusan: true }
  })
}
