import { type Request, type Response } from 'express'

import * as KelasService from '../services/kelas.service'
import { logInfo, logWarn } from '../utils/logger'

export const createKelas = async (req: Request, res: Response) => {
  if (!req.body?.nama || !req.body?.id_jurusan) {
    logWarn(req, 'Please provide all required fields')
    return res.status(400).json({ error: 'Isi semua field yang dibutuhkan' })
  }

  try {
    await KelasService.storeKelas(req.body)
    logInfo(req, 'Kelas has been registered')
    res.status(200).json({ message: 'Kelas anda berhasil terdaftar' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteKelas = async (req: Request, res: Response) => {
  try {
    await KelasService.removeKelas(req.params?.id)
    logInfo(req, 'Kelas has been deleted')
    res.status(200).json({ message: 'Kelas berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateKelas = async (req: Request, res: Response) => {
  try {
    await KelasService.changeKelas(req.params?.id, req.body)
    logInfo(req, 'Kelas has been updated')
    res.status(200).json({ message: 'Kelas berhasil diubah' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getKelas = async (req: Request, res: Response) => {
  try {
    const data = await KelasService.fetchAllKelas(req.params.idJurusan)

    logInfo(req, 'Getting Kelas data')
    res.status(200).json({ message: 'Berhasil mendapatkan data Kelas', data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
