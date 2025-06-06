import { type Request, type Response } from 'express'

import * as AuthService from '../services/auth.service'
import * as GuruService from '../services/guru.service'

import { IUser } from '../types/user.type'
import { logError, logWarn, logInfo } from '../utils/logger'
import { validRegisterForGuru } from '../validations/auth.validation'

export const register = async (req: Request, res: Response) => {
  const { value, error } = validRegisterForGuru(req.body as IUser & { nip: string })
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const isUserExist = await AuthService.findUserByEmail(value.email)
    if (isUserExist) {
      logWarn(req, 'Email is already registered')
      return res.status(400).json({ error: 'Email sudah terdaftar' })
    }

    const token = AuthService.generateToken()
    value.password = AuthService.hashing(value.password as string).toString()

    const { nip, ...rest } = value

    const user = await AuthService.addUser({ ...rest, token, is_email_verified: true, role: 'GURU' })
    await GuruService.storeGuru({ nip, id_user: user.id })

    AuthService.sendVerifyEmail(value.email, token)

    logInfo(req, 'User account has been registered')
    res.status(200).json({
      message: 'Akun anda berhasil terdaftar',
      data: {
        email: user.email,
        password: value.password
      }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getGuru = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10

  try {
    const { data, count } = await GuruService.fetchGuru({
      page: currentPage,
      limit: perPage,
      search: (q as string) || ''
    })

    logInfo(req, 'Fetching Guru Successfully')
    res.status(200).json({
      message: 'Berhasil mendapatkan semua guru',
      data: data,
      meta: {
        current_page: currentPage,
        limit: perPage,
        total: count
      }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateGuru = async (req: Request, res: Response) => {
  const { value, error } = validRegisterForGuru(req.body as IUser & { nip: string })
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const userExists = await AuthService.findUserByEmail(value.email)
    if (userExists && req.params.id !== userExists?.id) {
      logWarn(req, 'Email is already registered')
      return res.status(400).json({ error: 'Email sudah terdaftar' })
    }

    const token = AuthService.generateToken()
    if (value.password) {
      value.password = AuthService.hashing(value.password as string).toString()
    }

    const { nip, ...rest } = value

    const user = await GuruService.changeUser(req.params.id, { ...rest, token, is_email_verified: true })
    await GuruService.changeGuru(user.guru?.id as string, { nip, id_user: user.id })

    AuthService.sendVerifyEmail(value.email, token)

    logInfo(req, 'User account has been updated')
    res.status(200).json({
      message: 'Akun guru berhasil diubah',
      data: {
        email: user.email,
        password: value.password
      }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteGuru = async (req: Request, res: Response) => {
  try {
    await GuruService.removeGuru(req.params.id)
    logInfo(req, 'Guru has been deleted')
    res.status(200).json({ message: 'Guru berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ error })
  }
}
