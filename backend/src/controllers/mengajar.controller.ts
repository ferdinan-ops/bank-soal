import { type Request, type Response } from 'express'

import * as MengajarService from '../services/mengajar.service'
import { logInfo, logWarn } from '../utils/logger'
import { UserRole } from '.prisma/client'

export const createMengajar = async (req: Request, res: Response) => {
  if (!req.body?.tahun_ajaran || !req.body?.id_guru || !req.body?.id_mata_pelajaran || !req.body?.id_kelas) {
    logWarn(req, 'Please provide all required fields')
    return res.status(400).json({ error: 'Isi semua field yang dibutuhkan' })
  }

  try {
    await MengajarService.storeMengajar(req.body)
    logInfo(req, 'Mengajar has been registered')
    res.status(200).json({ message: 'Mengajar anda berhasil terdaftar' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteMengajar = async (req: Request, res: Response) => {
  try {
    await MengajarService.removeMengajar(req.params?.id)
    logInfo(req, 'Mengajar has been deleted')
    res.status(200).json({ message: 'Mengajar berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateMengajar = async (req: Request, res: Response) => {
  try {
    await MengajarService.changeMengajar(req.params?.id, req.body)
    logInfo(req, 'Mengajar has been updated')
    res.status(200).json({ message: 'Mengajar berhasil diubah' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getMengajar = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10

  try {
    const { data, count } = await MengajarService.fetchMengajar({
      page: currentPage,
      limit: perPage,
      search: (q as string) || '',
      role: req.role as UserRole,
      userId: req.userId as string
    })

    logInfo(req, 'Fetching Mengajar Successfully')
    res.status(200).json({
      message: 'Berhasil mendapatkan semua mengajar',
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
