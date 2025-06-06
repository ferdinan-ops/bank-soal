import { type Request, type Response } from 'express'

import * as JurusanService from '../services/jurusan.service'
import { logInfo, logWarn } from '../utils/logger'

export const createJurusan = async (req: Request, res: Response) => {
  if (!req.body?.nama) {
    logWarn(req, 'Please provide all required fields')
    return res.status(400).json({ error: 'Isi semua field yang dibutuhkan' })
  }

  try {
    await JurusanService.storeJurusan(req.body)
    logInfo(req, 'Jurusan has been registered')
    res.status(200).json({ message: 'Jurusan anda berhasil terdaftar' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteJurusan = async (req: Request, res: Response) => {
  try {
    await JurusanService.removeJurusan(req.params?.id)
    logInfo(req, 'Jurusan has been deleted')
    res.status(200).json({ message: 'Jurusan berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateJurusan = async (req: Request, res: Response) => {
  try {
    await JurusanService.changeJurusan(req.params?.id, req.body)
    logInfo(req, 'Jurusan has been updated')
    res.status(200).json({ message: 'Jurusan berhasil diubah' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getJurusan = async (req: Request, res: Response) => {
  try {
    const jurusan = await JurusanService.fetchAllJurusan()

    logInfo(req, 'Getting jurusan data')
    res.status(200).json({ message: 'Berhasil mendapatkan data jurusan', data: jurusan })
  } catch (error) {
    res.status(500).json({ error })
  }
}
