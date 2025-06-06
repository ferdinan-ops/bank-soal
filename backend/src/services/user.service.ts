import { userSelect } from '../utils/service'
import db from '../utils/db'
import { IUserUpdatePayload } from '../types/user.type'

export const getUserLogin = async (userId: string) => {
  return await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullname: true,
      email: true,
      photo: true,
      provider: true,
      role: true
    }
  })
}

export const updateUserById = async (userId: string, payload: IUserUpdatePayload) => {
  return await db.user.update({
    where: { id: userId },
    data: payload,
    select: userSelect.select
  })
}

export const updatePhoto = async (userId: string, filename: string) => {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error('User tidak ditemukan')

  // const oldPhoto = user.photo
  // const newPhoto = await processPhoto(oldPhoto, filename)

  return await db.user.update({
    where: { id: userId },
    data: { photo: filename },
    select: {
      ...userSelect.select
    }
  })
}

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({ where: { email } })
}

export const updateEmail = async (userId: string, email: string, token: string) => {
  return await db.user.update({ where: { id: userId }, data: { email, is_email_verified: false, token } })
}

export const fetchAllUser = async (search: string) => {
  return await db.user.findMany({
    where: {
      role: 'SISWA',
      OR: [{ fullname: { contains: search } }, { email: { contains: search } }]
    },
    select: {
      ...userSelect.select
      // _count: {
      //   select: {
      //     hasil: true
      //   }
      // }
    }
  })
}
