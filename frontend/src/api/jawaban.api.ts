import api from './axiosInstance'
import { AnswerType, ScoreDetailType, ScoreType } from '@/lib/types/jawaban.type'

export const createAnswersFn = async (payload: { answers: unknown; id_soal: string }) => {
  return await api.post('/jawaban', payload)
}

export const getAnswersFn = async (soalId: string, userId?: string): Promise<AnswerType[]> => {
  const response = await api.get(`/jawaban/${soalId}`, {
    params: {
      userId
    }
  })
  return response.data?.data
}

export const getAnswersByUserIdFn = async (userId: string, search: string): Promise<ScoreType[]> => {
  const response = await api.get(`/jawaban/user/${userId}`, {
    params: { q: search }
  })
  return response.data?.data
}

export const getAnswerBySoalFn = async (soalId: string): Promise<ScoreDetailType[]> => {
  const response = await api.get(`/jawaban/soal/${soalId}`)
  return response.data?.data
}
