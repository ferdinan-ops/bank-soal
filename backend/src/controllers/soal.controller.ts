import { Request, Response } from 'express'
import { ISoal } from '../types/soal.type'
import { validSoal } from '../validations/soal.validation'
import logger, { logError, logInfo, logWarn } from '../utils/logger'

import * as SoalService from '../services/soal.service'
import { UserRole } from '.prisma/client'

export const createSoal = async (req: Request, res: Response) => {
  const { value, error } = validSoal(req.body as ISoal)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    await SoalService.storeSoal(value)
    logInfo(req, 'Soal has been registered')
    res.status(200).json({ message: 'Soal anda berhasil terdaftar' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateSoal = async (req: Request, res: Response) => {
  const { value, error } = validSoal(req.body as ISoal)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const soal = await SoalService.fetchDetailSoal(req.params?.idSoal)
    if (!soal) {
      logWarn(req, 'Soal is not registered')
      return res.status(400).json({ error: 'Soal belum terdaftar' })
    }

    await SoalService.changeSoal(req.params?.idSoal, value)
    logInfo(req, 'Soal has been updated')
    res.status(200).json({ message: 'Soal anda berhasil diubah' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteSoal = async (req: Request, res: Response) => {
  try {
    const soal = await SoalService.fetchDetailSoal(req.params?.idSoal)
    if (!soal) {
      logWarn(req, 'Soal is not registered')
      return res.status(400).json({ error: 'Soal belum terdaftar' })
    }

    await SoalService.removeSoal(req.params?.idSoal)
    logInfo(req, 'Soal has been updated')
    res.status(200).json({ message: 'Soal anda berhasil diubah' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getSoal = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10

  const meta = { current_page: currentPage, limit: perPage }

  try {
    const { data, count } = await SoalService.fetchSoal({
      page: currentPage,
      limit: perPage,
      search: (q as string) || '',
      role: req.role as UserRole,
      userid: req.userId as string
    })

    logInfo(req, 'Fetching Soal Successfully')
    res.status(200).json({
      message: 'Berhasil mendapatkan semua soal',
      data,
      meta: { ...meta, total: count }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getSoalByMengajar = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10

  try {
    const { data, count } = await SoalService.fetchSoal({
      page: currentPage,
      limit: perPage,
      search: (q as string) || '',
      role: req.role as UserRole,
      userid: req.userId as string,
      idMengajar: req.params?.idMengajar
    })

    logInfo(req, 'Fetching Soal Successfully')
    res.status(200).json({
      message: 'Berhasil mendapatkan semua soal',
      data,
      meta: { current_page: currentPage, limit: perPage, total: count }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getDetailSoal = async (req: Request, res: Response) => {
  try {
    const data = await SoalService.fetchDetailSoal(req.params?.idSoal)

    logInfo(req, 'Fetching Detail Soal Successfully')
    res.status(200).json({
      message: 'Berhasil mendapatkan detail soal',
      data
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getSoalDijawab = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10

  const meta = { current_page: currentPage, limit: perPage }

  try {
    const { data, count } = await SoalService.fetchSoalSudahDijawab({
      page: currentPage,
      limit: perPage,
      search: (q as string) || '',
      userid: req.userId as string
    })

    logInfo(req, 'Fetching Soal Successfully')
    res.status(200).json({
      message: 'Berhasil mendapatkan semua soal',
      data,
      meta: { ...meta, total: count }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}
