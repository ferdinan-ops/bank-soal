import { UserRole } from '.prisma/client'
import { type Request, type Response } from 'express'
import * as MataPelajaranService from '../services/mata-pelajaran.service'
import { logInfo } from '../utils/logger'

export const getAllMataPelajaran = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10

  const meta = { current_page: currentPage, limit: perPage }

  try {
    const { data, count } = await MataPelajaranService.fetchAllMataPelajaran({
      page: currentPage,
      limit: perPage,
      search: (q as string) || '',
      role: req.role as UserRole,
      userid: req.userId as string
    })

    logInfo(req, 'Fetching Mata Pelajaran Successfully')
    res.status(200).json({
      message: 'Berhasil mendapatkan semua mata pelajaran',
      data,
      meta: { ...meta, total: count }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getMataPelajaran = async (req: Request, res: Response) => {
  try {
    const data = await MataPelajaranService.fetchMataPelajaran(req.params?.id)

    logInfo(req, 'Fetching Mata Pelajaran Successfully')
    res.status(200).json({ message: 'Berhasil mendapatkan mata pelajaran', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const createMataPelajaran = async (req: Request, res: Response) => {
  if (!req.body?.nama) {
    logInfo(req, 'Please provide all required fields')
    return res.status(400).json({ error: 'Isi semua field yang dibutuhkan' })
  }

  try {
    await MataPelajaranService.storeMataPelajaran(req.body)
    logInfo(req, 'Mata Pelajaran has been registered')
    res.status(200).json({ message: 'Mata Pelajaran anda berhasil terdaftar' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateMataPelajaran = async (req: Request, res: Response) => {
  try {
    await MataPelajaranService.changeMataPelajaran(req.params?.id, req.body)
    logInfo(req, 'Mata Pelajaran has been updated')
    res.status(200).json({ message: 'Mata Pelajaran berhasil diubah' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteMataPelajaran = async (req: Request, res: Response) => {
  try {
    await MataPelajaranService.removeMataPelajaran(req.params?.id)
    logInfo(req, 'Mata Pelajaran has been deleted')
    res.status(200).json({ message: 'Mata Pelajaran berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ error })
  }
}
