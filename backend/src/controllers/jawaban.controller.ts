import { Request, Response } from 'express'
import { validAnswers } from '../validations/jawaban.validation'

import * as JawabanService from '../services/jawaban.service'

import { IAnswerBody } from '../types/jawaban.type'
import logger, { logError, logInfo } from '../utils/logger'

export const createAnswers = async (req: Request, res: Response) => {
  logger.info(req.body)
  const { value, error } = validAnswers(req.body as IAnswerBody)
  const payload = value as IAnswerBody

  if (error) {
    logError(req, error)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const user = await JawabanService.getSiswaByUserId(req.userId as string)

    const hasil = await JawabanService.addNewHasil({
      id_soal: value.id_soal,
      id_siswa: user?.siswa?.id as string
    })

    for (const item of payload.answers) {
      const question = await JawabanService.getCorrectAnswers(item.id_detail_soal)

      const isCorrect = JawabanService.checkAnswer(item.answer, question?.correct_answers as string)

      const res = await JawabanService.addNewAnswer({
        answer: JSON.stringify(item.answer),
        id_detail_soal: item.id_detail_soal,
        is_correct: isCorrect as boolean,
        id_hasil: hasil.id
      })

      logger.info({ res })
    }

    logInfo(req, 'Answers submitted successfully')
    res.status(201).json({
      message: 'Jawaban berhasil didaftarkan'
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const getAnswers = async (req: Request, res: Response) => {
  const userId = req.userId as string

  try {
    let data
    if (req.role === 'GURU') {
      const answers = await JawabanService.getAnswersByUserId(req.query?.userId as string, req.params.idSoal)
      data = answers.map((result) => ({
        ...result,
        answer: JSON.parse(result.answer as string),
        question: {
          ...result.detail_soal,
          options: JSON.parse(result.detail_soal.options as string),
          correct_answers: JSON.parse(result.detail_soal.correct_answers as string)
        }
      }))
    } else {
      const answers = await JawabanService.getAnswersByUserId(userId, req.params.idSoal)
      data = answers.map((result) => ({
        ...result,
        answer: JSON.parse(result.answer as string),
        question: {
          ...result.detail_soal,
          options: JSON.parse(result.detail_soal.options as string),
          correct_answers: JSON.parse(result.detail_soal.correct_answers as string)
        }
      }))
    }

    logInfo(req, 'Answers retrieved successfully')
    res.status(200).json({
      message: 'Jawaban berhasil didapatkan',
      data
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const getAnswersByUserId = async (req: Request, res: Response) => {
  const { q } = req.query
  logger.info({
    userId: req.params.userId,
    search: q
  })

  try {
    const users = await JawabanService.fetchAllAnswerByUserId(req.params.userId, (q as string) || '')

    logInfo(req, 'Answers retrieved successfully')
    res.status(200).json({
      message: 'Jawaban berhasil didapatkan',
      data: users
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const getAnswersBySoal = async (req: Request, res: Response) => {
  const { page, limit, q } = req.query
  const currentPage = Number(page) || 1
  const perPage = Number(limit) || 10

  const meta = { current_page: currentPage, limit: perPage }

  try {
    const { data, count } = await JawabanService.fetchAllAnswerBySoal({
      page: currentPage,
      limit: perPage,
      search: (q as string) || '',
      idSoal: req.params.idSoal
    })

    logInfo(req, 'Answers retrieved successfully')
    res.status(200).json({
      message: 'Jawaban berhasil didapatkan',
      data,
      meta: { ...meta, total: count }
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}
