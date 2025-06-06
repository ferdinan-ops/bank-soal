import db from '../utils/db'
import { IUser } from '../types/user.type'
import { IAddUserPayload } from './auth.service'

interface IGuru {
  nip: string
  id_user: string
}

export const storeGuru = async (payload: IGuru) => {
  return await db.guru.create({ data: payload })
}

type PaginationType = {
  page: number
  limit: number
  search: string
}

export const fetchGuru = async ({ page, limit, search }: PaginationType) => {
  const [data, count] = await db.$transaction([
    db.user.findMany({
      where: {
        role: 'GURU',
        OR: [
          { fullname: { contains: search } },
          { email: { contains: search } },
          { guru: { nip: { contains: search } } }
        ]
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        guru: true
      },
      orderBy: { fullname: 'asc' }
    }),
    db.user.count({
      where: {
        role: 'GURU',
        OR: [
          { fullname: { contains: search } },
          { email: { contains: search } },
          { guru: { nip: { contains: search } } }
        ]
      }
    })
  ])

  return { data, count }
}

export const changeUser = async (id: string, payload: IUser & IAddUserPayload) => {
  return await db.user.update({ where: { id }, data: payload, include: { guru: true } })
}

export const changeGuru = async (id: string, payload: IGuru) => {
  return await db.guru.update({ where: { id }, data: payload })
}

export const removeGuru = async (id: string) => {
  return await db.user.delete({ where: { id } })
}
