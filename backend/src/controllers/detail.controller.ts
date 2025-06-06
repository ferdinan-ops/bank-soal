import { Request, Response } from 'express'

import { IDetailSoal, ISoal } from '../types/soal.type'

import { validDetailSoal, validSoal } from '../validations/soal.validation'
import logger, { logError, logInfo, logWarn } from '../utils/logger'

import * as DetailSoalService from '../services/detail.service'

export const createDetailSoal = async (req: Request, res: Response) => {
  logger.info(req.body)
  const { value, error } = validDetailSoal(req.body as IDetailSoal)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    await DetailSoalService.storeDetailSoal(value)
    logInfo(req, 'Detail Soal has been registered')
    res.status(200).json({ message: 'Detail Soal anda berhasil terdaftar' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const updateDetailSoal = async (req: Request, res: Response) => {
  logger.info(req.body)
  const { value, error } = validDetailSoal(req.body as IDetailSoal)
  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const soal = await DetailSoalService.fetchDetailDetailSoal(req.params?.id)
    if (!soal) {
      logWarn(req, 'Detail Soal is not registered')
      return res.status(400).json({ error: 'Detail Soal belum terdaftar' })
    }

    await DetailSoalService.changeDetailSoalById(req.params?.id, value)
    logInfo(req, 'Detail Soal has been updated')
    res.status(200).json({ message: 'Detail Soal anda berhasil diubah' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const deleteDetailSoal = async (req: Request, res: Response) => {
  try {
    const soal = await DetailSoalService.fetchDetailDetailSoal(req.params?.id)
    if (!soal) {
      logWarn(req, 'Detail Soal is not registered')
      return res.status(400).json({ error: 'Detail Soal belum terdaftar' })
    }

    await DetailSoalService.removeDetailSoalById(req.params?.id)
    logInfo(req, 'Detail Soal has been updated')
    res.status(200).json({ message: 'Detail Soal anda berhasil diubah' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getDetailSoal = async (req: Request, res: Response) => {
  try {
    const data = await DetailSoalService.fetchDetailSoal(req.params?.idSoal)
    const questions = data.map((result) => ({
      ...result,
      correct_answers: JSON.parse(result.correct_answers as string),
      options: JSON.parse(result.options as string)
    }))

    logInfo(req, 'Fetching Soal Successfully')
    res.status(200).json({
      message: 'Berhasil mendapatkan semua soal',
      data: questions
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getDetailSoalForUser = async (req: Request, res: Response) => {
  try {
    const data = await DetailSoalService.fetchDetailSoal(req.params?.idSoal)
    const questions = data.map((result) => ({
      ...result,
      correct_answers: JSON.parse(result.correct_answers as string),
      options: JSON.parse(result.options as string)
    }))

    // Mengacak urutan soal menggunakan metode Linear Congruent Method (LCM)
    const shuffledQuestions = DetailSoalService.LCMShuffle(
      questions,
      1103515245, // Nilai 'a' (multiplier) yang umum digunakan dalam ANSI C rand()
      12345, // Nilai 'c' (increment) untuk menghindari nilai 0
      2 ** 31, // Nilai 'm' (modulus), menggunakan 2^31 untuk batas integer 32-bit
      new Date().getTime() // Menggunakan timestamp saat ini sebagai seed awal
    )

    logInfo(req, 'Fetching Soal Successfully')
    res.status(200).json({
      message: 'Berhasil mendapatkan semua soal',
      data: shuffledQuestions
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}
