import Joi from 'joi'

import {
  type IVerifyEmailPayload,
  type ILoginPayload,
  type IUser,
  type IResetPasswordPayload
} from '../types/user.type'

import { ISiswa } from '../services/siswa.service'

export const validRegister = (payload: IUser & Omit<ISiswa, 'id_user'>) => {
  const schema = Joi.object<IUser & Omit<ISiswa, 'id_user'>>({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().allow(null, ''),
    photo: Joi.string().allow(null, ''),
    nis: Joi.string().required(),
    id_kelas: Joi.string().required()
  })

  return schema.validate(payload)
}

export const validRegisterForGuru = (payload: IUser & { nip: string }) => {
  const schema = Joi.object<IUser & { nip: string }>({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().allow(null, ''),
    photo: Joi.string().allow(null, ''),
    nip: Joi.string().required()
  })

  return schema.validate(payload)
}

export const validLogin = (payload: ILoginPayload) => {
  const schema = Joi.object<ILoginPayload>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}

export const validVerifyEmail = (payload: IVerifyEmailPayload) => {
  const schema = Joi.object<IVerifyEmailPayload>({
    token: Joi.string().required()
  })
  return schema.validate(payload)
}

export const validResetPassword = (payload: IResetPasswordPayload) => {
  const schema = Joi.object<IResetPasswordPayload>({
    token: Joi.string().required(),
    password: Joi.string().required()
  })
  return schema.validate(payload)
}
