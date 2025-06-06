import { UserRole } from '.prisma/client'
import db from '../utils/db'

interface IMengajar {
  tahun_ajaran: string
  id_guru: string
  id_mata_pelajaran: string
  id_kelas: string
}

export const storeMengajar = async (payload: IMengajar) => {
  return await db.mengajar.create({ data: payload })
}

type PaginationType = {
  page: number
  limit: number
  search: string
}

export const fetchMengajar = async ({
  page,
  limit,
  search,
  role,
  userId
}: PaginationType & { role: UserRole; userId: string }) => {
  const whereClause = {
    ...(role === 'GURU' ? { guru: { id_user: userId } } : {}),
    OR: [
      { tahun_ajaran: { contains: search } },
      {
        guru: {
          OR: [
            { nip: { contains: search } },
            {
              user: {
                OR: [{ fullname: { contains: search } }, { email: { contains: search } }]
              }
            }
          ]
        }
      },
      {
        mata_pelajaran: {
          OR: [{ nama: { contains: search } }]
        }
      },
      {
        kelas: {
          OR: [
            { nama: { contains: search } },
            {
              jurusan: {
                OR: [{ nama: { contains: search } }]
              }
            }
          ]
        }
      }
    ]
  }

  const [data, count] = await db.$transaction([
    db.mengajar.findMany({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        guru: {
          include: { user: true }
        },
        mata_pelajaran: true,
        kelas: {
          include: { jurusan: true }
        }
      },
      orderBy: { tahun_ajaran: 'asc' }
    }),
    db.mengajar.count({ where: whereClause })
  ])

  return { data, count }
}

export const changeMengajar = async (id: string, payload: IMengajar) => {
  return await db.mengajar.update({ where: { id }, data: payload })
}

export const removeMengajar = async (id: string) => {
  return await db.mengajar.delete({ where: { id } })
}
